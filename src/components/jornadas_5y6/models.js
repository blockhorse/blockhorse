const mongoose = require('mongoose');

const Schema = mongoose.Schema;





const jornada_5y6 = new Schema({
  jornada: {type: Number, unique: true, index: true, required: true },
  torneo: { type: Number, default: '' },// Añadir 'required' para asegurar la presencia del trx_id
  tickets: { type: Array, default: [] },
  carreras:{ type: Array, default: [] },
  action: { type: String},
  ganadores_3:{ type: Array, default: [] },
  ganadores_4:{ type: Array, default: [] },
  ganadores_5:{ type: Array, default: [] },
  ganadores_6:{ type: Array, default: [] },
  eq_ganadores:{ type: Array, default: [] },
  status: { type: String, default: 'abierto' }, // Establecer valor predeterminado
  status_superior : { type: String, default: 'abierto' }, // Establecer valor predeterminado
  symbol_1: { type: String, default: 'BHRT' },
  symbol_2: { type: String, default: 'BHR' },
  symbol_3: { type: String, default: 'SWAP.HIVE' },
  acumulado_1: { type: Number, default: 0.00 }, // Especificar valores predeterminados
  acumulado_2: { type: Number, default: 0.00 },
  acumulado_3: { type: Number, default: 0.00 },
  pote_1: { type: Number, default: 0.00 }, // Especificar valores predeterminados
  pote_2: { type: Number, default: 0.00 },
  pote_3: { type: Number, default: 0.00 },
  retenido_1: { type: Number, default: 0.00 }, // Especificar valores predeterminados
  retenido_2: { type: Number, default: 0.00 },
  retenido_3: { type: Number, default: 0.00 },
  status_p_1: { type: String, default: 'abierto' },
  status_p_2: { type: String, default: 'abierto' },
  status_p_3: { type: String, default: 'abierto' },
  status_p_4: { type: String, default: 'abierto' },
  premio_1_final: { type: [], default: [] }, // Especificar valores predeterminados
  premio_2_final: { type: [], default: [] },
  premio_3_final: { type: [], default: [] },
  premio_4_final: { type: [], default: [] },

  dia:{ type: Date},
});





const jornadaModel = mongoose.model("jornada_5y6",jornada_5y6)

module.exports = jornadaModel;





