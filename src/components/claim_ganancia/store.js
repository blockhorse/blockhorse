require("dotenv").config();
const walletsModel= require('./../wallet/models.js')
const model= require('./models.js')
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





// async function register_claim_consuelo(...data) {
// console.log("ME ejecuto desde store Register Claim", data);

// }



// Importa el modelo o utiliza el esquema directamente aquí

async function register_claim_consuelo(data) {
  try {
    // Aquí se asume que "data" contiene un objeto con la información del reclamo
    const { usuario, balance, canje_apuestas_consuelo, articulo } = data;

    // Crear una instancia del modelo o esquema "claim_consuelo"
    const nuevoRegistro = new model({
      usuario: usuario,
      balance: balance,
      reclamo: articulo,
      valor: canje_apuestas_consuelo,
      entregado: false, // Puedes ajustar este valor según corresponda
      status_claim: "create", // Puedes ajustar este valor según corresponda
      error: "Sin errores", // Puedes ajustar este valor según corresponda
      dia_drop: new Date(), // Esto establece la fecha actual
    });

    // Guardar el nuevo registro en la base de datos
    const registroGuardado = await nuevoRegistro.save();

    console.log("Registro guardado con éxito:", registroGuardado);
    return registroGuardado;
  } catch (error) {
    console.error("Error al guardar el registro:", error);
    throw error;
  }
}




module.exports = {
get_claim,
register_claim,
register_claim_consuelo
}


