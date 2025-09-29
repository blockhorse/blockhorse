//helpars/util
function mapHiveTransactionToBurnedPost(tx) {
  if (tx.operation !== 'tokens_transfer') return null;

  if (!tx.memo || !tx.memo.startsWith("Burn tokens to vote on ")) return null;

  const postId = tx.memo.replace("Burn tokens to vote on ", "").trim();
  if (!postId) return null;

  const parts = postId.split("/");
  if (parts.length < 2) return null;

  return {
    userId: tx.from,
    postId,
    author: parts[0],
    title: '', // opcional, puedes obtener luego o dejar vacío
    burnedTokens: parseFloat(tx.quantity),
    voteValue: 0,
    voteDestination: postId,
    transactionHash: tx.transactionId,
    burnedAt: new Date(tx.timestamp * 1000),
    status: "pending",
    blockNumber: tx.blockNumber,
    confirmedAt: new Date(),
  };
}


module.exports = { mapHiveTransactionToBurnedPost };
