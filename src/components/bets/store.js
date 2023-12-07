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







async function buscar_apuestas(raceData) {
  try {
    const { race } = raceData;

    // Verificar si race es una cadena
    if (typeof race === 'string') {
      let raceIdsArray = [];

      if (race.includes(',')) {
        // Si contiene comas, dividir en una matriz y analizar cada ID
        raceIdsArray = race.split(',').map(id => parseInt(id.trim(), 10));
      } else {
        // Si es un solo valor, convertirlo a un entero y ponerlo en un array
        raceIdsArray.push(parseInt(race.trim(), 10));
      }

      // Realizar la búsqueda basada en los identificadores de carrera obtenidos
      const apuestas = await Model.find({ race: { $in: raceIdsArray } });

      console.log("Apuestas encontradas:", apuestas);
      return apuestas;
    } else if (typeof race === 'number') {
      // Si es un solo número, crear un array con ese número
      const apuestas = await Model.find({ race });

      console.log("Apuestas encontradas:", apuestas);
      return apuestas;
    } else {
      throw new Error('El identificador de carrera no es válido');
    }
  } catch (error) {
    console.error("Error al buscar apuestas:", error);
    return []; // o manejar el error según sea necesario
  }
}


// async function buscar_apuestas(raceData) {
//   console.log("raceData", raceData);

//   try {
//     const { race } = raceData;
//     console.log("raceBApues", race);

//     // Verificar si la cadena de identificadores de carrera existe
//     if (race) {
//       let raceIdsArray = [];

//       if (race.includes(',')) {
//         // Si contiene comas, dividir en una matriz y analizar cada ID
//         raceIdsArray = race.split(',').map(id => parseInt(id.trim(), 10));
//       } else {
//         // Si es un solo valor, convertirlo a un entero y ponerlo en un array
//         raceIdsArray.push(parseInt(race.trim(), 10));
//       }

//       // Realizar la búsqueda basada en los identificadores de carrera obtenidos
//       const apuestas = await Model.find({ race: { $in: raceIdsArray } });

//       console.log("Apuestas encontradas:", apuestas);
//       return apuestas;
//     } else {
//       throw new Error('No se proporcionaron identificadores de carrera');
//     }
//   } catch (error) {
//     console.error("Error al buscar apuestas:", error);
//     return []; // o manejar el error según sea necesario
//   }
// }






module.exports = {
agregarApuesta,
buscar_apuestas
}


