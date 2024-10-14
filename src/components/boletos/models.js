const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const jugada_5y6 = new Schema({
  trx_id: { type: String, unique: true, index: true, required: true }, // Añadir 'required' para asegurar la presencia del trx_id
  usuario: { type: String, required: true }, // Añadir 'required' si el campo debe ser obligatorio
  r_quantity:{ type: String, required: true },
  r_symbol: { type: String},
  r_recibe: { type: String},
  tiempo: { type: Number},
  action: { type: String},
  databaseHash: { type: String},
  block_number: { type: Number},
  race_1: { type: Array, default: [] }, // Definir tipo de datos y valores predeterminados
  race_2: { type: Array, default: [] },
  race_3: { type: Array, default: [] },
  race_4: { type: Array, default: [] },
  race_5: { type: Array, default: [] },
  race_6: { type: Array, default: [] },
  aciertos: { type: Object, default: {} }, // Especificar el tipo de dato y valores predeterminados
  acerto: { type: Number, default: 0 }, // Definir valor predeterminado
  jornada: { type: String }, // Añadir 'required' si necesario
  status: { type: String, default: 'abierto' }, // Establecer valor predeterminado
  premio_1: { type: String, default: '' }, // Especificar valores predeterminados
  symbol_1: { type: String, default: '' },
  premio_2: { type: String, default: '' },
  symbol_2: { type: String, default: '' },
  premio_3: { type: String, default: '' },
  symbol_3: { type: String, default: '' },
  costo: { type: Number, required: true }, // Añadir 'required' si el costo debe ser obligatorio
  verifica_costo: { type: Boolean, default: false }, // Establecer valor predeterminado
  memo:{ type: String},
  status_p_1: { type: String, default: 'abierto' },
  status_p_2: { type: String, default: 'abierto' },
  status_p_3: { type: String, default: 'abierto' },
  dia:{ type: Date},
});



const jugada_5y6Model = mongoose.model("jugada_5y6",jugada_5y6)

module.exports = jugada_5y6Model;