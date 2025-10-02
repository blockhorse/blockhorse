const BurnedPost = require("./model"); // tu modelo mongoose definido con el esquema

const getFullInfo = async (userId) => {
  // Aquí podrías agregar consultas agregadas para mercado y estado (simulado base)
  // Ejemplo solo devuelve el historial completo del usuario
  return await BurnedPost.find({ userId }).sort({ burnedAt: -1 }).lean();
};




// Busca el post en la BD por postId y devuelve el registro encontrado (o null)
const checkPostVoted = async (postId) => {
  console.log("checkPostVoted = async (postId)", postId);
  return await BurnedPost.findOne({ postId });
};



const getVotesByUser = async (userId) => {
  if (!userId) throw new Error("userId requerido");
  return BurnedPost.find({ userId })
    .sort({ burnedAt: -1 })
    .limit(20)
    .exec();
}


const getVotesByUse= async (userId) => {
 
}
module.exports = {
  getFullInfo,
  checkPostVoted,
  getVotesByUser,
};
