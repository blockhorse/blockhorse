const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cofre_E_deliverys = new Schema({
  // Usuario que reclama el cofre
  user: {
    type: String,
    required: true,
    index: true, // Define el campo como índice para búsquedas rápidas
  },
  // Objetos reclamados, cada uno con detalles específicos
  claims: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId, // Identificador único
        default: () => new mongoose.Types.ObjectId(), // Generar uno nuevo por cada subdocumento
      },
      cofre: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'delivered'],
        default: 'pending',
      },
      trx_id: {
        type: String,
        default: null,
      },
      claimedAt: {
        type: Date,
        default: Date.now,
      },
      deliveredAt: {
        type: Date,
        default: null,
      },
    },
  ],
});







const Cofre_E_deliverysModel = mongoose.model("Cofre_E_deliverys",Cofre_E_deliverys)

module.exports = Cofre_E_deliverysModel;