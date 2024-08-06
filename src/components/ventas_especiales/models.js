const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ventas_packs = new Schema({
    trx_id: { type: String, unique: true }, // Identificador único de la transacción
    numero: { type: Number }, // Número de identificación del equino
    tiempo:{ type: Date }, // Tiempo de la transacción
    dia:{ type: Date },
    r_quantity: { type: String }, // Cantidad recibida
    r_symbol: { type: String }, // Símbolo recibido
    r_recibe:{ type: String }, // Quién recibió la cantidad
    usuario: { type: String }, // Usuario relacionado con la transacción
    action: { type: String }, // Acción realizada
    block_whit_errors: { type: Boolean }, // Indica si hubo errores en el bloque
    checked_block: { type: Boolean }, // Indica si el bloque ha sido verificado
    block_number: { type: Number }, // Número de bloque
    memo: { type: String }, // Memo asociado a la transacción, con índice para búsquedas rápidas
    rarezaObtenida: { type: String }, // Puntos máximos obt
    status_nft: { type: String, default: "creado" }, // Estado de la transacción
    status_venta: { type: String, default: "creado" }, // Estado de la transacción
    status_entrega: { type: String, default: "creado" }, // Estado de la transacción_
    
    fecha: { type: Date, default: Date.now }, // Fecha de la transacción

}, {
    
    autoIndex:false,
    autoCreate: false,
});





const ventas_packsModel = mongoose.model("ventas_packs",ventas_packs)

module.exports = ventas_packsModel;




