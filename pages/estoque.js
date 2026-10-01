// Tipo de usuário
let tipoUsuario = "administrador";

// Elementos da página
const usuario = document.querySelector("#usuario span");
const perfil = document.querySelector("#usuario small");
const botaoCadastro = document.querySelector("#novo-produto");
const botoesMovimentacao = document.querySelectorAll(".movimentacao");


// Verifica o tipo de usuário
if (tipoUsuario === "administrador") {

    usuario.textContent = "Camila";
    perfil.textContent = "Administrador";

} else {

    usuario.textContent = "Funcionário";
    perfil.textContent = "Funcionário";

    // Funcionário não pode cadastrar produtos
    botaoCadastro.style.display = "none";

}


// Atualiza o status do produto
function atualizarStatus(produto, quantidade) {

    const status = produto.querySelector(".status");

    if (quantidade == 0) {

        status.textContent = "Crítico";
        status.className = "status critico";

    } else if (quantidade <= 3) {

        status.textContent = "Baixo";
        status.className = "status baixo";

    } else {

        status.textContent = "Normal";
        status.className = "status normal";

    }

}


// Atualiza os números do resumo
function atualizarResumo() {

    const produtos = document.querySelectorAll(".produto");

    let normal = 0;
    let baixo = 0;
    let critico = 0;

    produtos.forEach(function(produto) {

        const status = produto.querySelector(".status");

        if (status.classList.contains("normal")) {

            normal++;

        } else if (status.classList.contains("baixo")) {

            baixo++;

        } else if (status.classList.contains("critico")) {

            critico++;

        }

    });

    document.querySelector(".verde").textContent = normal;
    document.querySelector(".amarelo").textContent = baixo;
    document.querySelector(".vermelho").textContent = critico;

}


// Registrar movimentação
botoesMovimentacao.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const produto = botao.closest(".produto");

        const nomeProduto = produto.querySelector("h3").textContent;

        const quantidadeElemento =
            produto.querySelector(".produto-info span:nth-child(2) strong");

        let quantidadeAtual = parseInt(quantidadeElemento.textContent);

        const quantidade = prompt(
            "Digite a quantidade retirada de " + nomeProduto + ":"
        );

        if (quantidade != null && quantidade != "") {

            const quantidadeRetirada = parseInt(quantidade);

            if (quantidadeRetirada > quantidadeAtual) {

                alert("A quantidade retirada é maior que o estoque.");

            } else if (quantidadeRetirada <= 0) {

                alert("Digite uma quantidade válida.");

            } else {

                quantidadeAtual =
                    quantidadeAtual - quantidadeRetirada;

                quantidadeElemento.textContent = quantidadeAtual;

                atualizarStatus(produto, quantidadeAtual);

                atualizarResumo();

                alert(
                    "Movimentação registrada!\n" +
                    "Produto: " + nomeProduto + "\n" +
                    "Quantidade retirada: " + quantidadeRetirada
                );

            }

        }

    });

});


// Pesquisa de produtos
const campoBusca = document.querySelector("#buscar");

campoBusca.addEventListener("input", function() {

    const texto = campoBusca.value.toLowerCase();

    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(function(produto) {

        const nome = produto.querySelector("h3").textContent.toLowerCase();

        if (nome.includes(texto)) {

            produto.style.display = "block";

        } else {

            produto.style.display = "none";

        }

    });

});