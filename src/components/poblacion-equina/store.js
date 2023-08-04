require("dotenv").config();
const Model= require('./../equino/models.js')
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
console.log("conexion_db");


async function get_equinos(equino) {
  console.log("ME ejecuto desde store get equino",equino)
   return Equino = await Model.find(equino).catch((e)=>{
        console.log("errror")
        console.log(e)
      });
  console.log("EQU",Equino)

}




async function get_equinos_array(equinoArray) {
  console.log("ME ejecuto desde store get equino",equinoArray)
   return Equino = await Model.find({ equineId: { $in: equinoArray } }).catch((e)=>{
        console.log("errror")
        console.log(e)
      });
  console.log("EQU",Equino)

}


async function get_equinos_totales(){
const Equino =Model.aggregate([
          {
            $group: {
              _id: { generacion: "$generacion", sexo: "$sexo", tipo: "$tipo" },
              cantidad: { $sum: 1 }
            }
          },
          {
            $sort: { "_id.generacion": 1, "_id.sexo": 1, "_id.tipo": 1 }
          }
        ]);

return Equino

}
module.exports = {

get_equinos, 
get_equinos_array, 
get_equinos_totales


}




