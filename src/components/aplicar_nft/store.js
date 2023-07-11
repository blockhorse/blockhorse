require("dotenv").config();
const AplicarnftModel = require('./models');
const AplicarnftEquinoModel = require('./../equino/models');
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
console.log("conexion_db");


async function saveAplicarnft(aplicarnftData) {
  const aplicarnft = new AplicarnftModel(aplicarnftData);
  const result = await aplicarnft.save();
  return result;
}




async function getAuction(itemId) {
  return await AplicarnftModel.find();
}

async function getOne(itemId) {
  return await AplicarnftModel.findOne({ itemId: itemId });
}


async function newAuction(auction) {
  const newAuction = new AplicarnftModel(auction);
  console.log("Store: newAuction", newAuction);
  return await newAuction.save();
}


async function set_equino_status_implementos(equino) {
  console.log("SETEANDO ", equino);
  try {
    const Equino = await AplicarnftEquinoModel.findOneAndUpdate({ equineId: equino.equineId }, equino, { upsert: true, new: true });
    console.log("EQU", Equino);
    return Equino;
  } catch (error) {
    console.log("error");
    console.log(error);
  }
}

module.exports = {
  getAuction,
  getOne,
  saveAplicarnft,
  set_equino_status_implementos
}