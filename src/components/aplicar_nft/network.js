const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const { GuardarEnBase } = require('./controller');

router.post('/', async (req, res) => {
  res.header('Content-Type', 'application/json');
  res.header('Cache-Control', 'no-cache');
  res.header('Access-Control-Allow-Origin', '*');

  try {
    // Llamar al controlador para procesar el cofre
    console.log("req.body", req.body);
    const result = await GuardarEnBase(req.body);
    

    // Enviar respuesta al cliente
    response.success(req, res, result, 201);
  } catch (error) {
    // Si ocurre un error, enviar respuesta de error al cliente
    response.error(req, res, error.message, 400);
  }
});

module.exports = router;
