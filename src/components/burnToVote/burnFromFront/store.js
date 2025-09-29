const BurnedPost = require('./../consultaAbase/model.js'); // Ajusta ruta según lugar esquema

async function saveBurnVote(data) {
  const burnedPost = new BurnedPost({
    userId: data.userId,
    postId: data.postId,
    author: data.author,
    title: data.title,
    burnedTokens: data.burnedTokens,
    burnedTokensValue: data.burnedTokensValue,
    voteValue: data.voteValue,
    voteDestination: data.voteDestination,
    transactionHash: data.transactionHash,
    burnedAt: new Date(),
  });

  const saved = await burnedPost.save();
  return saved;
}

module.exports = {
  saveBurnVote,
};
