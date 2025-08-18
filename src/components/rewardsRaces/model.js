 const mongoose = require('mongoose');

const Schema = mongoose.Schema;


 rewardsRace= new Schema({
  race:  {
        type: Number,
        index:true
    },
  equine:  {
        type: Number,
        required:true
        
    }, 
    owner:  {
        type:String,
        
    },
  llegada:Number,
  premio_1: String,
  status_1:String,
  trx_1:String,
  premio_2:String,
  status_2:String,
  trx_2:String,
  premio_3: String,
  status_3:String,
  trx_3:String,
  premio_4: String,
  status_4:String,
  trx_4:String,
  premio_e: String,
  status_e:String,
  status_pago:String
 
}, {
    
    autoIndex:false,
    autoCreate: false,
});



const  rewardsRaceModel = mongoose.model("rewardsRace",rewardsRace)

module.exports = rewardsRaceModel;