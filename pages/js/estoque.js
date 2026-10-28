const add = document.getElementById('add-prod');
const btnTabela = document.getElementById('ver-prod');
const select = document.getElementById('s-prod');
const API_URL = 'http://localhost:8080';

let telaAtual = null;
let dados = [];
let produtoS = null;   // id do produto que está na balança
let pesoAtual = 0;     // peso usado no cadastro

//  TROCA DE TELAS 

add.onclick = function(){
    document.getElementById('tela-tabela').style.display = 'none';
    document.getElementById('tela-add').style.display = 'flex';
    telaAtual = 1;
}

btnTabela.onclick = async function(){
    document.getElementById('tela-add').style.display = 'none';
    document.getElementById('tela-tabela').style.display = 'flex';
    telaAtual = 2;
    await carregarDados();
    preencherSelect(dados);
}

//  SELECT 

select.addEventListener('change', async () => {
    produtoS = select.value ? Number(select.value) : null;
    console.log('Produto na balança:', produtoS);
    await conectarArduino();
});

function preencherSelect(data){
    const valorAtual = select.value; 
    select.innerHTML = '<option value="">Selecione o produto da balança</option>';

    data.forEach(p => {
        const option = document.createElement('option');
        option.textContent = p.nome;
        option.value = p.id;
        select.appendChild(option);
    });

    select.value = valorAtual;
}

//  TABELA 

function tabela(data){
    const body = document.getElementById('tbody');
    body.innerHTML = '';

    data.forEach(p => {
        const row = document.createElement('tr');
        const nome = document.createElement('td');
        const qtd = document.createElement('td');
        const status = document.createElement('td');

        nome.textContent = p.nome;
        row.appendChild(nome);

        qtd.textContent = p.quantidade;
        row.appendChild(qtd);

        if(p.quantidade < 3){
            status.innerHTML = 'ALERTA PIII PIII ALERTA';
            status.style.color = 'rgb(248, 2, 0)';
        }else if(p.quantidade < 10){
            status.innerHTML = 'Razoável pae';
            status.style.color = 'rgb(186, 117, 23)';
        }else{
            status.innerHTML = 'Tá suave man';
            status.style.color = 'rgb(29, 158, 117)';
        }
        row.appendChild(status);

        body.appendChild(row);
    });
}

async function carregarDados(){
    dados = await api();
    if (telaAtual == 2) tabela(dados);
}

// ATUALIZAÇÃO DO ESTOQUE

async function atualizarEstoque(){
    dados = await api();

    for (const p of dados) {
        let quantidade;

        if (Number(p.id) === produtoS && porta) {
            // produto selecionado: usa o peso real da balança
            console.log(pesoBalanca);
            quantidade = Math.round(pesoBalanca / p.peso_unitario);
        } else {
            // outros produtos: sorteado
            quantidade = 0;
        }

        await fetch(`${API_URL}/produtos/${p.id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ quantidade })
        });
    }

    carregarDados();
}

setInterval(() => {
    if (telaAtual == 2) atualizarEstoque();
}, 3000);

// CADASTRO 

async function guardarPeso(){
    if (!porta) {
        await conectarArduino();
        await new Promise(r => setTimeout(r, 1000)); // espera a primeira leitura
    }

    pesoAtual = pesoBalanca;
    document.getElementById('campo-peso').innerHTML = `Peso: ${pesoAtual}`;
}

async function guardarProduto(){
    const nomeP = document.getElementById('input-nome').value;

    if(pesoAtual <= 0){
        alert('Você precisa pesar o produto.');
        return;
    }

    const resposta = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ nome: nomeP, pesoUnitario: pesoAtual, quantidade: 0 })
    });

    if(!resposta.ok){
        alert('Erro ao inserir produto.');
        return;
    }

    alert('Produto inserido com sucesso!');

    document.getElementById('input-nome').value = '';
    document.getElementById('campo-peso').innerHTML = '';
    pesoAtual = 0;
}

//  EFEITO DO MOUSE 

document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--x', e.clientX + 'px');
    document.body.style.setProperty('--y', e.clientY + 'px');
});

carregarDados();