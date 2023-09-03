const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');

router.post('/', async (req, res) => {
 res.header('Content-Type', 'application/json');
res.header('Cache-Control', 'no-cache');
res.header('Access-Control-Allow-Origin', '*');

  try {
    // Llamar al controlador para procesar el cofre
    const result = await controller.processCofre_especial(req.body);

    // Enviar respuesta al cliente
    response.success(req, res, result, 201);
  } catch (error) {
    // Si ocurre un error, enviar respuesta de error al cliente
    response.error(req, res, error.message, 400);
  }
});

module.exports = router;
