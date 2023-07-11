const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const aplicarnft = {
  trx_id: { type: String, unique: true, index: true },
  account: { type: String },
  Nft_id: { type: Number, unique: true},
  Nft_type: { type: String },
  Nft_name: { type: String },
  Caballo_mint: { type: Number },
  Dia: { type: Date },
  Aplicado: { type: Boolean },
  Devuelto: { type: Boolean },
  Razon_Devolucion: { type: String },
  Status_wallet: { type: String , default:"check" }
};


const aplicarnftModel = mongoose.model("aplicarnft",aplicarnft)

module.exports = aplicarnftModel;
