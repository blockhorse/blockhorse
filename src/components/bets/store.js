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





async function agregarApuesta(equinoId,cantidadTickets, nombreEquino, race, usuario) {
  console.log("cantidadTickets, nombreEquino, race, usuario", cantidadTickets, nombreEquino, race, usuario);
  try {
    // Buscar la carrera en la que se realiza la apuesta
    const carrera = await Model.findOne({ race });
    console.log("Model", Model);
    console.log("carrera", carrera);

    if (carrera) {
      // La carrera existe, ahora agregamos la apuesta
      const apuesta = {
        equinoId,
        nombreEquino,
        cantidadTickets,
        usuario,
      };

      // Verificar que carrera.apuestas sea un arreglo o inicializarlo como un arreglo vacío
      // if (!Array.isArray(carrera.apuestas)) {
      //   carrera.apuestas = [];
      // }

      // Agregar la apuesta a la lista de apuestas en la carrera
      carrera.apuestas.push(apuesta);

      // Calcular el nuevo Total_Pote
      carrera.Total_Pote += cantidadTickets;

      // Guardar los cambios en la carrera
      await carrera.save();

      console.log('Apuesta agregada con éxito.');
    } else {
      console.log('La carrera no existe.');
    }
  } catch (error) {
    console.error('Error al agregar la apuesta:', error);
  }
}




async function buscar_apuestas(race) {
console.log("ME ejecuto desde store Buscar Apuestas", race);
const apuestas = await Model.find(race).catch(e => {
    console.log("error");
    console.log(e);
  });
  console.log("Wallet", apuestas);
  return apuestas;
}




module.exports = {
agregarApuesta,
buscar_apuestas
}


