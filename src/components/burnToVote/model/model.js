const mongoose = require("mongoose");

const NodoSchemaS = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  activo: {
    type: Boolean,
    required: true,
    default: true,
  },
  ultimaActividad: {
    type: Date,
    required: true,
    default: Date.now,
  },
  intentosFallidos: {
    type: Number,
    required: true,
    default: 0,
  },
  // Opcional: campo para metadatos o notas sobre el nodo
  notas: {
    type: String,
    default: null,
  },
}, {
  timestamps: true, // Crea createdAt y updatedAt automáticamente
});





module.exports = mongoose.model("NodoSchema", NodoSchemaS);

