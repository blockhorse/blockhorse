const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const { GuardarEnBase, ObtenerNftAplicados } = require('./controller');

router.post('/', async (req, res) => {
  res.header('Content-Type', 'application/json');
  res.header('Cache-Control', 'no-cache');
  res.header('Access-Control-Allow-Origin', '*');

  try {
    // Llamar al controlador para procesar el cofre
    // console.log("req.body", req.body);
    const result = await GuardarEnBase(req.body);
    

    // Enviar respuesta al cliente
    response.success(req, res, result, 201);
  } catch (error) {
    // Si ocurre un error, enviar respuesta de error al cliente
    response.error(req, res, error.message, 400);
  }
});





router.get('/', async (req, res) => {

  res.header('Content-Type', 'application/json');
  res.header('Cache-Control', 'no-cache');
  res.header('Access-Control-Allow-Origin', '*');

  try {
    // Llamar al controlador para obtener los datos requeridos
    // Esto es un ejemplo, reemplaza esta lógica con tu funcionalidad real
    const result = await ObtenerNftAplicados(req.query);

    // Enviar respuesta con los datos al cliente
    response.success(req, res, result, 200);
  } catch (error) {
    // Enviar respuesta de error al cliente en caso de errores
    response.error(req, res, error.message, 500);
  }
});

module.exports = router;
