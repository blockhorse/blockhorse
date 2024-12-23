const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

// Ruta GET
router.get('/', function (req, res) {
  controller.get_torneo(req.query).then((resultado) => {
    response.success(req, res, resultado, 201);
  }).catch((error) => {
    response.error(req, res, error.message, 500);
  });
});

// Ruta POST
router.post('/', function (req, res) {
 
});

module.exports = router;
