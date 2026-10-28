const produtosModel = require('../model/produtosModel');


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

async function adicionar(req, res) {
    const { nome, pesoUnitario } = req.body;

    try {
        const prod = await produtosModel.adicionarProdutos(nome, pesoUnitario);
        res.status(201).json(prod);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro ao adicionar produto' });
    }
}

async function atualizar(req, res) {

    const id = Number(req.params.id);
    const quantidade = req.body.quantidade;

    try{
        const prod = await produtosModel.atualizarQtd(id, quantidade);

        if(!prod) return res.status(404).json({erro: "Não achou não."})
        
        res.json(prod);
    }catch(error){
        console.log(error);
        return res.status(500).json({erro: "Erro no servidor, bjs."})
    }
}

module.exports = {listar, adicionar, atualizar};