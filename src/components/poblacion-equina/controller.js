//const Equino = require('./../equino/models.js');
const store = require('./store.js');
// require("dotenv").config();
// const Model= require('./models.js')
// //const {get_equinos}= require('./store.js')
// const MONGOOSE = process.env.MONGOUSE
// const URI_MD = `mongodb://${MONGOOSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority`
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// async function connect() {
//   try {
//     await mongoose.connect(URI_MD, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// }






async function checkServerConnection() {
  try {
    const response = await fetch('/ping'); // Cambia la ruta a un recurso que responda con éxito
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function getCantidadCaballos(req, res) {
  const isServerConnected = await checkServerConnection();

  if (!isServerConnected) {
    // El servidor está conectado, puedes llamar a connect()
    //await connect();

    const equineId = req.query;
    console.log("equineId", equineId);

    if ('equineId' in equineId) {
      console.log('El objeto tiene la clave "equineId"');
      try {
        let caballos = await store.get_equinos(equineId);
        res.status(200).json(caballos);
      } catch (error) {
        console.log("Error al obtener la tabla de caballos", error);
        res.status(500).json({ error: error.message });
      } finally {
        // await mongoose.disconnect();
      }
    } else {
      try {
        const caballos = await store.get_equinos_totales()
        res.status(200).json(caballos);
      } catch (error) {
        console.log("Error al obtener la tabla de caballos", error);
        res.status(500).json({ error: error.message });
      } finally {
        // await mongoose.disconnect();
      }
    }
  } else {
    // El servidor no está conectado
    res.status(500).json({ error: "No se pudo conectar al servidor" });
  }
}








module.exports = {
  getCantidadCaballos
};




