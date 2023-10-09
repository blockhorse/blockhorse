require("dotenv").config();
const walletsModel= require('./../wallet/models.js')
console.log("walletsModel", walletsModel);

const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
console.log("conexion_db");




async function get_claim(usuario) {
console.log("ME ejecuto desde store get wallet", usuario);
const claim = await walletsModel.find(usuario).catch(e => {
console.log("error");
console.log(e);
  });
  console.log("Claimed?", claim);
  return claim;
}



async function register_claim(usuario) {
  console.log("ME ejecuto desde store Register Claim", usuario);
  
  try {
    const claim = await walletsModel.findOneAndUpdate(usuario[0],usuario[1]);
    console.log("Register_Claim", claim);
    return claim;
  } catch (error) {
    if (error.code === 11000) {
      // Código 11000 corresponde a un error de duplicado (clave única)
      console.log("Error de duplicado:", error);
      // Manejar el error según sea necesario
    } else {
      // Manejar otros errores
      console.log("Error:", error);
    }
  }
}










module.exports = {
get_claim,
register_claim
}


