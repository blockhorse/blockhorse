require("dotenv").config();
const {chest_buyModel}= require('./../hivepay/models.js')
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
console.log("conexion_db");



async function updateCofres(user, cofres) {
  try {
    // Obtener los datos de los cofres para el usuario
    const cofresData = await chest_buyModel.findOne({ usuario: user }).exec();

    // Verificar que los cofres no estén en estado "pending"
    if (cofresData.status === 'pending') {
      throw { message: 'Espera a que lleguen tus cofres reclamados', statusCode: 400 };
    }

    // Verificar que hay suficientes llaves y cofres para procesar
    const llavesDisponibles = cofresData.llaves_compradas - cofresData.llaves_gastadas;
    const cofresDisponibles = cofresData.cofres_compradas - cofresData.cofres_gastadas;

    if (llavesDisponibles < cofres || cofresDisponibles < cofres) {
      throw { message: 'No tienes suficientes llaves o cofres para procesar', statusCode: 400 };
    }

    // Actualizar los datos de los cofres
    await chest_buyModel.updateOne(
      { usuario: user },
      {
        $inc: {
          cofres_m_procesando: cofres,
          llaves_m_gastadas: cofres,
          cofres_m_gastadas: cofres,
        },
        $set: { status_m: 'pending' },
      }
    ).exec();

    return { message: `Se han procesado ${cofres} cofres para el usuario ${user}`, statusCode: 200 };
  } catch (error) {
    throw error;
  }
}

async function getCofresForUser(user) {
  try {
    const cofresData = await chest_buyModel.findOne({ usuario: user }).exec();
    return cofresData;
  } catch (error) {
    throw error;
  }
}

module.exports = { updateCofres, getCofresForUser };




