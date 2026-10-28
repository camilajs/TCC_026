
function funcionalidades(numero){
    console.log(numero)

    const cadastrar = document.getElementById('cadastrar-peso');
    const tabela = document.getElementById('qtd-produtos');


    if (numero == 1){
        cadastrar.style.display = 'flex';
        tabela.style.display = 'none';
    }else if(numero == 2){
        cadastrar.style.display = 'none';
        tabela.style.display = 'flex';
    }
}

async function api(){
    const url = `http://localhost:8080/produtos`

    try{
        const response = await fetch(url)

        if(!response.ok){
            console.log('Deu erro no fetch')
            return;
        }

        const dados = await response.json();

        console.log(dados);
        tabela(dados);
    }catch(erro){
        console.log('Erro', erro);
    }
}

function tabela(data){
    const body = document.getElementById('tbody');

    data.forEach(p => {
        const row = document.createElement('tr');
        const nome = document.createElement('td');
        const qtd = document.createElement('td');
        const botao = document.createElement('td');

        nome.innerHTML = `${p.nome}`
        row.appendChild(nome);

        qtd.innerHTML = `${p.quantidade}`
        row.appendChild(qtd);

        const add = document.createElement('button');
        add.textContent = 'Adicionar';
        botao.appendChild(add);
        row.appendChild(botao);

        body.appendChild(row);
    });
}

const usuario = sessionStorage.getItem('usuario');

if (usuario) {
    const dadosUsuario = JSON.parse(usuario);

    document.getElementById('nome-usuario').textContent = dadosUsuario.nome;

    if (dadosUsuario.tipo_usuario === 'administrador') {
        document.getElementById('tipo-usuario').textContent = 'Administrador';
    } else if (dadosUsuario.tipo_usuario === 'funcionario') {
        document.getElementById('tipo-usuario').textContent = 'Funcionário';
    } else {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
        window.location.href = './login.html';
    }

    if (dadosUsuario.tipo_usuario === 'administrador' ||
        dadosUsuario.tipo_usuario === 'funcionario') {
        api();
    }
} else {
    window.location.href = './login.html';
}

document.getElementById('botao-sair').addEventListener('click', function() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');

    window.location.href = './login.html';
});