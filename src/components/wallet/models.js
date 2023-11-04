const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wallets={
  usuario: { type: String, unique: true, index: true },
  balance:{type:Number, default:0},
    ganancia_apuestas:{type:Number, default:0},
  balance_drops:{type:Number, default:0},
  balance_cofre_e:{type:Number, default:0},
  status_drop:{type:String, default:"free"},
  status_retiro: {type:String, default:"free"},
  status_claim_ganancia:{type:String, default:"free"},
  status_cofres:{type:String, default:"free"},
  dia_drop:{type:Date},
  retiros:{type:Number, default:0},
  retiros_drops:{type:Number, default:0},
  entradas:{type:Number, default:0},
  retiros_trx:{type:Object},
  entradas_trx:{type:Array, default:[]},
  retirados_cofres_especiales:{type:Number, default:0}


}




const walletsModel = mongoose.model("wallets",wallets)

module.exports = walletsModel;




