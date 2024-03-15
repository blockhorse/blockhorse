const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wallets={
  usuario: { type: String, unique: true, index: true },
  balance:{type:Number, default:0},
  ganancia_por_propiedad:{type:Object},
  ganancia_apuestas:{type:Number, default:0},
  ganancias_apuestas_segundoLugar:{type:Number, default:0},
  ganancias_apuestas_tercerLugar:{type:Number, default:0},
  ganancias_apuestas_cuartoLugar:{type:Number, default:0},
  ganancias_apuestas_quintoLugar:{type:Number, default:0},
  ganancias_apuestas_sextoLugar:{type:Number, default:0},
  balance_drops:{type:Number, default:0},
  balance_cofre_e:{type:Number, default:0},
  status_drop:{type:String, default:"free"},
  status_cofres:{type:String, default:"free"},
  status_retiro:{type:String, default:"free"},
  status_claim_ganancia:{type:String, default:"free"},
  status_claim_ganancia_consolacion:{type:String, default:"free"},
  status_claim_ganancia_consolacion_BHR:{type:String, default:"free"},
  entrada_ganancias:{type:Object},
  entrada_ganancias_consuelo:{type:Object},
  entrada_ganancias_consuelo_BHR:{type:Object},
  canjes:{type:Object},
  dia_drop:{type:Date},
  retiros:{type:Number, default:0},
  retiros_drops:{type:Number, default:0},
  entradas:{type:Number, default:0},
  dia_entrada:{type:Date},
  retiros_trx:{type:Object},
  dia_retiro:{type:Date},
  entradas_trx:{type: Array},
  retirados_cofres_especiales:{type:Number, default:0}
}



const walletsModel = mongoose.model("wallets",wallets)

module.exports = walletsModel;




