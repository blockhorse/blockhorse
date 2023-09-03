require("dotenv").config();

const  walletsModel   = require("./../wallet/models.js");
const Model= require('./models.js')
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
console.log("conexion_db");




async function get_wallet(usuario) {
console.log("ME ejecuto desde store get wallet", usuario);
const wallet = await walletsModel.find(usuario).catch(e => {
    console.log("error");
    console.log("wallet Store",e);
  });
  console.log("Wallet Store F", wallet);
  return wallet;
}


// async function set_wallet(usuario) {
// console.log("ME ejecuto desde store get wallet", usuario);
// const wallet = await walletsModel.findOneAndUpdate(usuario).catch(e => {
//     console.log("error");
//     console.log("wallet Store",e);
//   });
//   console.log("Wallet Store F", wallet);
//   return wallet;
// }



async function set_wallet(filtro,actualizacion) {
walletsModel.findOneAndUpdate(filtro, actualizacion, (error, documentoActualizado) => {
  if (error) {
    console.error('Error al actualizar el documento:', error);
  } else {
    console.log('Documento actualizado:', documentoActualizado);
  }
});
}











module.exports = {
get_wallet,
set_wallet
}


