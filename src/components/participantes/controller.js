
const store = require('./store.js');




async function get_participantes(body){
console.log("BODY get_participantes", body)
let prueba= { equineId: '87,164', race: '4492' }
return new Promise((resolve,reject) =>{
resolve(store.get_participantes(body,50,"fetch"))
})
}

// BODY get_equino { equineId: '87,164', race: '4492' }




module.exports = {
  get_participantes
}