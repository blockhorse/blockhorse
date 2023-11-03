
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const sistemas_activoShema= new Schema({
  usuario: { type: String, unique: true, index: true },
  apuestas:{ type: String, default:"active" },
  ingresar_hive:{ type: String, default:"active" },
  retirar_hive:{ type: String, default:"active" },
  alimentar_caballo:{ type: String, default:"active" },
  inscribir_en_carrera:{ type: String, default:"active" },

});


const activeModel = mongoose.model("sistemas_activos", sistemas_activoShema)

module.exports = activeModel;
