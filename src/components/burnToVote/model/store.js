const NodoShema = require("./model"); // tu modelo mongoose definido con el esquema


const nodoShema = async (userId) => {
  if (!userId) throw new Error("userId requerido");
  return NodoShema.find( userId )
}

module.exports = {
  nodoShema,
};
