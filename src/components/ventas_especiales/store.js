require("dotenv").config();
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




async function get_ventas_packs(usuario) {
console.log("ME ejecuto desde store get wallet", usuario);
const ventas_packs = await Model.find(usuario).catch(e => {
    console.log("error");
    console.log(e);
  });
  console.log("Wallet", ventas_packs);
  return ventas_packs;
}









module.exports = {
get_ventas_packs,
}


