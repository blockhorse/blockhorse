
const store = require('./store.js');




async function get_participantes(body){
console.log("BODY get_participantes", body)
let prueba= { equineId: '87,164', race: '4492' }
return new Promise((resolve,reject) =>{
resolve(store.get_participantes(body,50,"fetch"))
})
}

// BODY get_equino { equineId: '87,164', race: '4492' }





async function get_ultimas_participaciones(body) {
  console.log("BODY get_ultimas_participaciones", body);
  
  if (!body) {
    throw new Error("El parámetro 'usuario' es obligatorio");
  }

  const filtro = {
    usuario: body,
  };

  // Asumo que store.get_ultimas_participaciones recibe filtro y devuelve Promise
  const resultado = await store.get_ultimas_participaciones(filtro);
  return resultado;
}




module.exports = {
  get_participantes,
  get_ultimas_participaciones,

}