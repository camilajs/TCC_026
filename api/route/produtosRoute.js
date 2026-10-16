const express = require('express');
const router = express.Router();
const controller = require('../controller/produtosController');

router.get('/', controller.listar);

module.exports = {router};