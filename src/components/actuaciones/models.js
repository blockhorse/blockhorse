
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const actuacion = new Schema({
  raceid:  {
        type: Number,
        index:true
    },
  equineId:  {
        type: Number,
         required: true
        
    },
  account:String,
  name:String,
  tipo:String,
  sexo:String,
  generacion:Number,
  salud: Number,
  velocidad:Number,
  velocidad_add:Number,
  resistencia:Number,
  resistencia_add:Number,
  multiplicador:Number,
  divisor:Number,
  Total_1:Number,
  agilidad:Number,
  animo:Number,
  Total_animo:Number,
  Jokey:String,
  Total_3:Number,
  Total:Number,
  llegada:Number, 

}, {
    
    autoIndex:false,
    autoCreate: false,
});





const actuacionModel = mongoose.model("actuacion",actuacion)

module.exports = actuacionModel;