const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantesSchema = new Schema(
  {
    trx_Registro: {
      type: String,
      lowercase: true,
      required: true,
      index: true,
      unique: true,         // Lo agrego porque tu segundo esquema lo indicó
      validate: {
        isAsync: true,
        validator: function (value, isValid) {
          const self = this;
          return self.constructor.findOne({ trx_Registro: value })
            .exec(function (err, trx_Registro) {
              if (err) {
                throw err;
              } else if (trx_Registro) {
                if (self.id === trx_Registro.id) {
                  // Si actualiza el mismo documento, es válido
                  return isValid = true;
                }
                return isValid = false;
              } else {
                return isValid = true;
              }
            });
        },
        message: 'The transaction already exists!',
      },
    },
    r_quantity: { type: String },
    r_symbol: { type: String },
    r_recibe: { type: String },
    action: { type: String },
    race: { type: String },
    carreraId: { type: String },
    usuario: { type: String },
    sponsor: { type: Boolean },
    equineId: { type: Number }, // aquí unifiqué como Number según el segundo esquema
    equinoName: { type: String },
    databaseHash: { type: String },
    block_number: { type: String },
    memo: { type: String },
    block_whit_errors: { type: Boolean },
    checked_block: { type: Boolean },
    qty_match: { type: Boolean },
    validacion_Registro: { type: Boolean },
    devolucion_Registro: { type: Boolean },
    motivo_devolucion: { type: String },
    trx_devolucion: { type: String },
    puesto_Llegada: { type: String },
    premio_1: { type: String },
    trx_Premio1: { type: String },
    estado_trx_1: { type: String },
    premio_2: { type: String },
    trx_Premio2: { type: String },
    estado_trx_2: { type: String },
    premio_3: { type: String },
    trx_Premio3: { type: String },
    estado_trx_3: { type: String },
    resultado_1: { type: Number },
    resultado_2: { type: Number },
    resultado_3: { type: Number },
    resultado_4: { type: Number },
    resultado_5: { type: Number },
    agilidad: { type: Number },
    velocidad: { type: Number },
    resistencia: { type: Number },
    implementos_ptos: { type: Number },
    alimentos_ptos: { type: Number },
    animo: { type: Number },
    tipo: { type: String },
    account: { type: String },
    JockeyId: { type: String },
    pts_Jokey: { type: String },
    Resultado_Jockey: { type: String },
    Pago_Jockey: { type: String },
    owner_Jockey: { type: String },
    trx_Jockey: { type: String },
    checked: { type: String, default: false }, // según primer esquema
  },
  {
    versionKey: false,
    timestamps: true,
    autoIndex: false,
    autoCreate: false,
  }
);

const participantesModel = mongoose.model('participantes', participantesSchema);

module.exports = participantesModel;
