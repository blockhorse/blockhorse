const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');



router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ); // Replace with your frontend domain
  res.header('Access-Control-Allow-Methods', 'GET'); // Adjust the allowed HTTP methods as needed
  next();
});

router.post('/', async (req, res) => {
//  console.log("req, res", req.body);

  try {
    // Llamar al controlador para procesar el cofre
    const result = await controller.get_claims(req.body);

    // Enviar respuesta al cliente
    response.success(req, res, result, 201);
  } catch (error) {
    // Si ocurre un error, enviar respuesta de error al cliente
    response.error(req, res, error.message, 400);
  }
});

module.exports = router;
