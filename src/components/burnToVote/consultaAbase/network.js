const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

// Endpoint para validar si un post ya fue votado
router.get('/infobase', async (req, res) => {
  try {
    const { postId } = req.query;
    console.log("postId recibido:", postId);
    if (!postId) {
      return response.error(req, res, 'Missing the postId parameter', 400);
    }
    const voted = await controller.checkPostVoted(postId);
    console.log("voted", voted);
    response.success(req, res, { voted }, 200);
  } catch (error) {
    console.error(error);
    response.error(req, res, 'Internal error verifying post', 500);
  }
});


router.get('/history', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return response.error(req, res, 'Missing the user paramete', 400);
    }
    const votes = await controller.getVotesHistory(userId);
    response.success(req, res, votes, 200);
  } catch (error) {
    console.error(error);
    response.error(req, res, 'Error obtaining history', 500);
  }
});


module.exports = router;
