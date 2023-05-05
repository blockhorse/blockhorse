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
          cofres_procesando: cofres,
          llaves_gastadas: cofres,
          cofres_gastadas: cofres,
        },
        $set: { status: 'pending' },
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




// tengo este network

// const express= require('express');
// const response = require('../../network/response')
// const controller =require("./controller")
// const router= express.Router()


// router.post('/', function (req, res)  {
//     body=JSON.stringify(req.body)
 

 
// })

// module.exports = router;


// que recibe estos datos en via post post "req.body"
// { user_cofres: { user_claim: 'alvarogonz', cofres: '1' } }


// este es su  model 
// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;



// const chest_buy = new Schema({
//   usuario: {
//     type: String,
//     index: true,
//     unique: true 
//   },
//   llaves_compradas: {
//     type: Number,
//     default: 0
//   },
//   cofres_compradas: {
//     type: Number,
//     default: 0
//   },
//   cofres_procesando: {
//     type: Number,
//     default: 0
//   },                   
//   llaves_gastadas: {
//     type: Number,
//     default: 0
//   },
//   cofres_gastadas: {
//     type: Number,
//     default: 0
//   },
//    status: {
//     type: String,
//     default:"create"
//   }
// }, {
//   autoIndex: false,
//   autoCreate: false
// });



// const chest_buyModel = mongoose.model("chest_buy",chest_buy)

// module.exports={ chest_buyModel}


// y este el archivo store

// require("dotenv").config();
// const {payhiveModel,chest_buyModel}= require('./models.js')
// const MONGOUSE = process.env.MONGOUSE
// URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
// const db = require('mongoose');
// db.Promise = global.Promise;
// db.connect(URI_MD, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// })
// console.log("conexion_db");



// function getChestsForUser(user) {
// return chest_buyModel.findOne({ usuario: user }).exec();
// }


// module.exports = {
// }



// maneja que en el controler junto con el store  hagan lo siguiente confirme que 
// primero verifica que status sea diferente a pending, de no ser asi devuelve un error
// que diga espera que lleguen tus cofres reclamados, de ser diferente a pending 

// verifica que las llaves_compradas menos  las llaves_gastadas sean igual o mayor a 
// el Number de "cofres" en el body.
// igualmente que los cofres_compradas menos los  cofres_gastadas  sean igual o mayor a 
// el Number de "cofres" en el body.


// si eso es asi entonces   "cofre" debe guardarse en cofres_procesando y cambiar el status a pending

//  