const express = require('express');
const response = require('../../network/response'); // Asumiendo esta estructura para responder
const store = require('./store.js');
const router = express.Router();

/**
 * POST /rewards/batch
 * Body: { claves: [ { race: Number, equine: Number }, ... ] }
 * Retorna lista de rewards matching para esos pares
 */
router.post('/', (req, res) => {
  const { claves } = req.body;

  if (!Array.isArray(claves) || claves.length === 0) {
    return res.status(400).json({ error: 'El parámetro "claves" es obligatorio y debe ser un array no vacío' });
  }

  store.getRewardsByRaceEquinePairs(claves)
    .then((resultado) => {
      response.success(req, res, resultado, 200);
    })
    .catch((error) => {
      console.error('Error en rewardsRace batch:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
});

module.exports = router;
