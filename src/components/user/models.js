const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarios={
  usuario: { type: String, unique: true, index: true },
  referente:{type: String },
   registrado: { 
    type: Date,}, 
    referidos: {
  type: Array
 }
}



const usuariosModel = mongoose.model("usuarios",usuarios)

module.exports = usuariosModel;
