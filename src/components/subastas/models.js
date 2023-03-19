const mongoose = require("mongoose");

const Schema = mongoose.Schema;





const auctionSchema = {
  itemId: { 
    type: Number,
    required: true,
    index: true,
    unique: true,
  }, // ID del artículo que se está subastando
  startingTime: { 
    type: Date,
    required: true
  }, // Tiempo de inicio de la subasta
  endingTime: { 
    type: Date,
    required: true
  }, // Tiempo de finalización de la subasta
  startingPrice: { 
    type: Number,
    required: true
  }, // Precio inicial
  currentPrice: { 
    type: Number,
    required: true
  }, // Precio actual
    symbol: { 
    type: String,
    required: true
  }, // Precio actual

  highestBidder: { 
    type: String,
    required: true
  }, // Nombre del postor más alto
  lastBidder: { 
    type: String,
    required: true
  }, // Nombre del último postor
  previousBidder: { 
    type: String,
    
  }, // Nombre del postor anterior
  lastBidValue: { 
    type: Number,
    required: true
  }, // Valor de la última puja
  previousBidValue: { 
    type: Number,
    
  }, // Valor de la puja anterior
  transactionId: { 
    type: String, 
    required: true, 
    index: true, 
    unique: true,
  }, // ID de la transacción
   previous_transactionId: { 
    type: String, 
    index: true, 
    unique: true,
  }, 
  status: { 
    type: String, 
    required: true, 
    enum: ['Active', 'Inactive', 'Completed'] 
  }, // Estado de la subasta
    status_lastBid: { 
    type: String, 
    enum: ['Add', 'Process', 'Success'] 
  } // Estado de la subasta

};




const auctionsModel = mongoose.model("auctions",auctionSchema)

module.exports = auctionsModel;