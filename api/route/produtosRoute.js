const express = require('express');
const router = express.Router();
const controller = require('../controller/produtosController');

router.get('/', controller.listar);
router.post('/', controller.adicionar);
router.patch('/:id', controller.atualizar);

module.exports = {router};