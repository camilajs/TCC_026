produtosModel = require('../model/produtosModel');


async function listar(req, res) {
    try{
        const produtos = await produtosModel.listarProdutos();
        res.json(produtos);
    }
    catch(error){
        console.error(error)
        res.status(500).json({erro: 'Erro ao buscar produtos'});
    }
}


module.exports = {listar};