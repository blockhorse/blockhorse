// /components/burnVote/network.js
const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

// Obtener info de mercado y estado del usuario
router.get('/info', async (req, res) => {
  try {
    const { account } = req.query;
    console.log("account", account);
    if (!account) {
      return response.error(req, res, 'Falta el parámetro account', 400);
    }
    const data = await controller.getFullInfo(account);
    console.log("data", data);
    response.success(req, res, data, 200);
  } catch (error) {
    console.error(error);
    response.error(req, res, 'Error interno al obtener info', 500);
  }
});

module.exports = router;
