const mongoose = require('mongoose');

const Schema = mongoose.Schema;




const especial_chest = new Schema({
  usuario: {
    type: String,
    default:"no"
  },
   Dia: {
    type: Date,
    index: true,
    unique: true 
  },
   trx_entregado:{
    type: Array,
              
  },
  amount:{
    type: Number,
    default: 0
  },
  
  objeto_formado: {
    type: Object,
    default: 0
  },  
  status: {
    type: String,
    default:"freec"
  }
}, {
  autoIndex: false,
  autoCreate: false
});



const especial_chestModel = mongoose.model("especial_chest",especial_chest)

module.exports = especial_chestModel;