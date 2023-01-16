const mongoose = require('mongoose');

const Schema = mongoose.Schema;





const equino = new Schema({
  equineId:  {
        type: Number,
        index:true
    },
  tipo:String,
  generacion:String,
  account:String,
  name:String,
  sexo:String,
  salud: String,
  velocidad:String,
  velocidad_add:String,
  resistencia:String,
  resistencia_add:String,
  agilidad:String,
  animo:String,
  carreras:Array,
  llegadas:Object,
  estado:String,
  status:String,
  Nacimiento:Date,
  Dias_Vida:String,
  Carreras_Utiles:String,
  Schedule:Number,
  Dia_descanzo:Date,

}, {
    
    autoIndex:false,
    autoCreate: false,
});




const equinoModel = mongoose.model("equino",equino)

module.exports = equinoModel;






