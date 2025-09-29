const mongoose = require("mongoose");

const BurnedPostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  postId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  burnedTokens: {
    type: Number,
    required: true,
    min: 0,
  },
  voteValue: {
    type: Number,
    required: true,
    min: 0,
  },
  voteDestination: {
    type: String,
  },
  transactionHash: {
    type: String,
  },
  burnedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  // Nuevos campos para mejores controles y auditoría:
  status: { type: String, default: "pending" }, // pending, processed, failed, refunded, etc.
  errorMessage: { type: String },

  blockNumber: { type: Number }, // bloque blockchain donde se confirma
  
  confirmedAt: { type: Date }, // cuando se confirma en blockchain/backend
  
  retryCount: { type: Number, default: 0 }, // intentos de procesamiento
  
  metadata: { type: mongoose.Schema.Types.Mixed }, // datos adi cionales
  
  ipAddress: { type: String }, // para auditoría o seguridad

  // Campos para manejar el refund
  burnedTokensEffective: { type: Number, min: 0, default: 0 }, // tokens realmente consumidos para voto
  refundAmount: { type: Number, min: 0, default: 0 }, // tokens devueltos si hubo exceso
  refundReason: { type: String }, // motivo del refund, si aplica
  refundProcessedAt: { type: Date }, // cuando se procesó el refund
  refundTransactionHash: { type: String }, // tx hash para la devolución si la hay

  refunded: { type: Boolean, default: false }, // si ya fue procesado un refund
});




module.exports = mongoose.model("BurnedPost", BurnedPostSchema);

