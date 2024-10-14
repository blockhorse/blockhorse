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

// Obtener el número de conexiones abiertas
const numConnections = db.connections.length;

console.log(`Número de conexiones abiertas: ${numConnections}`);


async function get_races(races) {
  const { limit = 50, tipo_carrera = 'Oficial', sort = { _id: -1 } } = races; // Desestructuramos con valores predeterminados

  console.log("Ejecutando get_races con los siguientes parámetros:", { limit, tipo_carrera, sort });

  try {
    // Realiza la consulta a la base de datos utilizando los parámetros desestructurados
    const result = await Model.find({ tipo_carrera })
      .sort(sort)  // Ordena los registros según el parámetro 'sort'
      .limit(limit);  // Limita el resultado al número especificado en 'limit'

    return result;
  } catch (e) {
    console.log("Error al obtener las carreras:");
    console.log(e);
    throw e; // Lanza el error para manejo externo si es necesario
  }
}





async function get_race(races) {

  try {
    // Realiza la consulta a la base de datos utilizando los parámetros desestructurados
    const result = await Model.find(races)

    return result;
  } catch (e) {
    console.log("Error al obtener las carreras:");
    console.log(e);
    throw e; // Lanza el error para manejo externo si es necesario
  }
}


module.exports = {

get_races, 
get_race


}


