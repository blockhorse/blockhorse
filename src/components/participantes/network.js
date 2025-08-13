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



module.exports = router;
