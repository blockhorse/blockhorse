const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const claim_drops={
  usuario: { type: String, unique: true, index: true },
  balance_drops:{type:Number, default:0},
  status_claim:{type:String, default:"create"},
  dia_drop:{type:Date,default:Date},

}



const claim_dropsModel = mongoose.model("claim_drops",claim_drops)

module.exports = claim_dropsModel;




