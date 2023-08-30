
const mongoose = require('mongoose');

const Schema = mongoose.Schema;




const entrenamiento = new Schema({
 equineId:Number,
 endurance:Array,
 speed:Array,
 trx_nft:String,
 status:String,
 validar:Boolean,
})




const entrenamientoModel = mongoose.model("entrenamiento",entrenamiento)

module.exports = entrenamientoModel;

