const mongoose = require('mongoose');

const syncSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // Un registro por usuario
  },
  lastSync: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true, // para createdAt y updatedAt automáticos
});

const Sync = mongoose.model('Sync', syncSchema);

module.exports = Sync;
