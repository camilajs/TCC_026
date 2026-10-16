const {pool} = require('../bd.js');

async function listarProdutos(){
    const resultado = await pool.query('SELECT * FROM produtos');
    return resultado.rows;
}

module.exports = {listarProdutos};