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


const sistemas_activos={
  usuario: { type: String, unique: true, index: true },
  apuestas:{ type: String, default:"active" },
  ingresar_hive:{ type: String, default:"active" },
  retirar_hive:{ type: String, default:"active" },
  alimentar_caballo:{ type: String, default:"active" },
  inscribir_en_carrera:{ type: String, default:"active" },
  apuestas:{type: String, default:"active"}
}




const usuariosModel = mongoose.model("usuarios",usuarios)

module.exports = usuariosModel;



