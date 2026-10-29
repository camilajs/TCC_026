const formulario = document.getElementById('formLogin');
const mensagem = document.getElementById('mensagem');

formulario.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputPassword').value;

    mensagem.textContent = 'Verificando acesso...';

    try {
        const resposta = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = resultado.erro || 'Não foi possível entrar.';
            return;
        }

        sessionStorage.setItem('token', resultado.token);
        sessionStorage.setItem('usuario', JSON.stringify(resultado.usuario));

        if (resultado.usuario.tipo_usuario === 'administrador') {
            mensagem.textContent = 'Entrando como administrador...';
        } else if (resultado.usuario.tipo_usuario === 'funcionario') {
            mensagem.textContent = 'Entrando como funcionário...';
        } else {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('usuario');
            mensagem.textContent = 'Perfil de usuário não reconhecido.';
            return;
        }

        setTimeout(function() {
            window.location.href = './estoque.html';
        }, 1000);

    } catch (error) {
        console.error(error);
        mensagem.textContent = 'Não foi possível conectar à API.';
    }
});