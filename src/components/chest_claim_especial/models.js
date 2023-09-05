const mongoose = require('mongoose');

const Schema = mongoose.Schema;




const chest_especial = new Schema({
  usuario: {
    type: String,
    default:"no"
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
    
  },  
  status: {
    type: String,
    default:"free"
  }
}, {
  autoIndex: false,
  autoCreate: false
});



const chest_especialModel = mongoose.model("chest_especial",chest_especial)

module.exports = chest_especialModel;