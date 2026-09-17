// Tipo de acesso
const administrador = document.getElementById("administrador");
const funcionario = document.getElementById("funcionario");

let tipoSelecionado = "administrador";

// Botão administrador
administrador.addEventListener("click", function() {

    tipoSelecionado = "administrador";

    administrador.style.backgroundColor = "#703B94";
    funcionario.style.backgroundColor = "transparent";

});

// Botão funcionário
funcionario.addEventListener("click", function() {

    tipoSelecionado = "funcionario";

    funcionario.style.backgroundColor = "#703B94";
    administrador.style.backgroundColor = "transparent";

});

