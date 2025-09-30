const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      userId,
      postId,
      author,
      title,
      burnedTokens,
      burnedTokensEffective,
      burnedTokensValue,  // si sigue siendo necesario
      voteValue,
      voteDestination,
      transactionHash,
      status,
      errorMessage,
      blockNumber,
      confirmedAt,
      retryCount,
      metadata,
      ipAddress,
      refundAmount,
      refundReason,
      refundProcessedAt,
      refundTransactionHash,
      refunded,
    } = req.body;

    // Validación básica
    if (
      !userId ||
      !postId ||
      !author ||
      !burnedTokens ||
      !voteValue ||
      !transactionHash
    ) {
      return response.error(req, res, 'Faltan datos obligatorios', 400);
    }

    const result = await controller.processBurnVote({
      userId,
      postId,
      author,
      title,
      burnedTokens,
      burnedTokensEffective,
      burnedTokensValue,
      voteValue,
      voteDestination,
      transactionHash,
      status,
      errorMessage,
      blockNumber,
      confirmedAt,
      retryCount,
      metadata,
      ipAddress,
      refundAmount,
      refundReason,
      refundProcessedAt,
      refundTransactionHash,
      refunded,
    });

    response.success(req, res, result, 201);
  } catch (error) {
    console.error('Error en /burn-vote', error);
    response.error(req, res, 'Error interno procesando la quema y voto', 500);
  }
});

module.exports = router;
