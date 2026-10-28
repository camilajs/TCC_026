const {pool} = require('../bd.js');

async function listarProdutos(){
    const resultado = await pool.query('SELECT * FROM produtos');
    return resultado.rows;
}

async function adicionarProdutos(nome, pesoUnitario) {
    const resultado = await pool.query(
        'INSERT INTO produtos (nome, peso_unitario) VALUES ($1, $2) RETURNING *',
        [nome,  pesoUnitario]
    );
    return resultado.rows[0];
}

async function atualizarQtd(id, qtd) {
    const resultado = await pool.query(
        'UPDATE produtos SET quantidade = $1 WHERE id = $2 RETURNING *',
        [qtd, id]
    );
    return resultado.rows[0];
}

module.exports = { listarProdutos, adicionarProdutos, atualizarQtd };