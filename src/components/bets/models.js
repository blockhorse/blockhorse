const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const apuesta_ganador= new Schema({
 race:  {
        type: Number,
    index:true,
    unique:true 
    },
  apuestas:Array,
  pagando:Object,
  ganador:Number,
  ganador_name:String,
  Total_Pote:Number,
  status:String,
  despachado:{type:Boolean, default:false},
   createdAt: {
    type: Date,
    default: Date.now, // Establece la fecha y hora actual como valor predeterminado
  },
     updatedAt: {
    type: Date,
    default: Date.now, // Establece la fecha y hora actual como valor predeterminado
  },
  

}, {
    
    autoIndex:false,
    autoCreate: false,
});





const apuestas_ganadorModel = mongoose.model("apuesta_ganador",apuesta_ganador)

module.exports = apuestas_ganadorModel;
