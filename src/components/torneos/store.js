// store.js

require("dotenv").config();
const torneosModel = require('./../registrarEnTorneo/models');
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
console.log("conexion_db");



// Obtener el número de conexiones abiertas
const numConnections = db.connections.length;

console.log(`Número de conexiones abiertas: ${numConnections}`);






// Función para obtener una jornada por su número
const getTorneoByNumber = async (torneo) => {
  try {
    const jornadaData = await torneosModel.findOne(torneo);
    return jornadaData;
  } catch (error) {
    console.error('Error al obtener la jornada:', error);
    throw new Error('Error en la base de datos');
  }
};

module.exports = {
  getTorneoByNumber,
};
