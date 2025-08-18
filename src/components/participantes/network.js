const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

// Middleware to enable CORS
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

router.get('/', (req, res) => {
  controller.get_participantes(req.query)
    .then((resultado) => {
      res.header('Content-Type', 'application/json');
      res.header('Cache-Control', 'no-cache');
      response.success(req, res, resultado, 201);
    })
    .catch((error) => {
      // Handle error
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});



router.get('/ultimas-participaciones/', (req, res) => {
  const usuario = req.query.usuario;
  if (!usuario) {
    return res.status(400).json({ error: 'El parámetro usuario es obligatorio' });
  }
  controller.get_ultimas_participaciones(usuario)
    .then((resultado) => {
      res.header('Content-Type', 'application/json');
      res.header('Cache-Control', 'no-cache');
      response.success(req, res, resultado, 200);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
});


module.exports = router;
