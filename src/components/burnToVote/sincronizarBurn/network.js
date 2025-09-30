const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

// Endpoint para sincronizar historial
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return response.error(req, res, 'Falta el parámetro userId', 400);
    }
    const result = await controller.sincronizarBurn(userId);
    response.success(req, res, result, 200);
  } catch (error) {
    console.error(error);
    response.error(req, res, 'Error synchronizing the history', 500);
  }
});

module.exports = router;
