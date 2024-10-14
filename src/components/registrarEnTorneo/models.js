const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const torneos = new Schema({
  id_Torneo: { type: Number, unique: true, index: true, required: true }, // Añadir 'required' para asegurar la presencia del trx_id
  Registrados: { type: Array, default: [] }, // Definir tipo de datos y valores predeterminados
  Ganadores_Fase_1: { type: Array, default: [] },
  Ganadores_Fase_2: { type: Array, default: [] },
  Ganadores_Fase_3: { type: Array, default: [] },
  Ganadores_Fase_4: { type: Array, default: [] },
  Carrera_Final:  { type: Array, default: [] },
  Premio_Fase_1: { type: String, default: '' }, // Especificar valores predeterminados  
  Premio_Fase_2: { type: String, default: '' }, // Especificar valores predeterminados  
  Premio_Fase_3: { type: String, default: '' }, // Especificar valores predeterminados  
  Premio_Fase_4: { type: String, default: '' }, // Especificar valores predeterminados  
  acerto: { type: Number, default: 0 }, // Definir valor predeterminado
  jornadas: { type: Array, default: [] }, // Añadir 'required' si necesario
  status: { type: String, default: 'abierto' }, // Establecer valor predeterminado
  pool_total_1: { type: Number, default: '' },
  pool_total_2: { type: Number, default: '' },
  pool_total_3: { type: Number, default: '' },
  premio_1: { type: Number, default: '' },
  symbol_1: { type: String, default: '' },
  premio_2: { type: Number, default: '' },
  symbol_2: { type: String, default: '' },
  premio_3: { type: Number, default: '' },
  symbol_3: { type: String, default: '' },
  tipo: { type: String, default: '3Fases' },
  costo_registro_1: { type: Number }, // Añadir 'required' si el costo debe ser obligatorio
  symbol_1_registro: { type: String, default: '' },
  costo_registro_2: { type: Number }, // Añadir 'required' si el costo debe ser obligatorio
  symbol_2_registro: { type: String, default: '' },
  costo_registro_3: { type: Number }, // Añadir 'required' si el costo debe ser obligatorio
  symbol_3_registro: { type: String, default: '' },
  status_inscriciones: { type: String, default: 'abierto' },
  status_desarrollo: { type: String, default: 'abierto' },
  status_general: { type: String, default: 'abierto' },
});





const TorneosModel = mongoose.model("torneos",torneos)

module.exports = TorneosModel;