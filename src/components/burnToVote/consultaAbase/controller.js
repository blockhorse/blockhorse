const store = require("./store");

const getFullInfo = async (userId) => {
  if (!userId) throw new Error("Usuario requerido");
  const data = await store.getFullInfo(userId);
  // Puedes enriquecer data agregando cálculos o info adicional aquí
  return data;
};

// const checkPostVoted = async (postId) => {
//   if (!postId) throw new Error("postId requerido");
//   const voted = await store.checkPostVoted(postId);
//   return voted; // true o false
// };


// En controller.js

// Revisa en la base de datos si el postId ya tiene voto registrado
const checkPostVoted = async (postId) => {
  if (!postId) throw new Error("postId requerido");

  // Llama al store para hacer la consulta
  const existingVote = await store.checkPostVoted(postId);

  if (!existingVote) {
    return { voted: false };
  }

  return {
    voted: true,
    status: existingVote.status || "pending",
    refunded: existingVote.refunded || false,
  };
};


const getVotesHistory = async (userId) => {
  console.log("Info Burned Votes userId", userId);
  if (!userId) throw new Error("userId requerido");
  const votes = await store.getVotesByUser(userId);
  console.log("Info Burned Votes userId a regresar", votes);
  return votes;
};

module.exports = {
  getFullInfo,
  checkPostVoted,
  getVotesHistory,
};
