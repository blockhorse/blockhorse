const mongoose = require('mongoose');

const Schema = mongoose.Schema;








const  participantesRace = new Schema(
{
     trx_Registro: {
        type: String,
        lowercase: true,
        required: true,
        index: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid ){
                const self = this;
                return self.constructor.findOne({ trx_Registro: value })
                .exec(function(err, trx_Registro){
                    if(err){
                        throw err;
                    }
                    else if(trx_Registro) {
                        if(self.id === trx_Registro.id) {  // if finding and saving then it's valid even for existing email
                            return isValid=true;
                        }
                        return isValid=false;  
                    }
                    else{
                        return isValid=true;
                    }

                })
            },
            message:  'The transaction   already exist!'
        },
    },
     carreraId: {
        type: String,

    },


  usuario:  {
        type: String,

    },




    equineId: {
        type: String,
    },

     JockeyId: {
        type: String,
    },

   pts_Jokey: {
        type: String,
       
    },
     Resultado_Jockey: {
        type: String,
       
    },
    Pago_Jockey: {
        type: String,
        
    },





    owner_Jockey: {
        type: String,
        
    },
   trx_Jockey:{
        type: String,
    },
 
    validacion_Registro: {
        type:Boolean,
        
    },
     devolucion_Registro: {
        type: Boolean,
        
    },


   trx_devolucion: {
      type: String,
        
    },

    puesto_Llegada:{
      type: String,
       
    },

    premio_1:{
      type: String,
        
    },
    trx_Premio1:{
      type: String,
       
    },
    estado_trx_1:  {
      type: String,
        
    },
    premio_2: {
      type: String,
        
    },
    trx_Premio2:  {
      type: String,
        
    },
    estado_trx_2:  {
      type: String,
        
    },
    premio_3: {
      type: String,
        
    },
    trx_Premio3:  {
      type: String,
        
    },
    estado_trx_3:  {
      type: String,
        
    },
     resultado_1:  {
      type: Number,
        
    }, resultado_2:  {
      type: Number,
        
    }, resultado_3:  {
      type: Number,
        
    }, resultado_4:  {
      type: Number,
        
    }, resultado_5:  {
      type: Number,
        
    },
       checked:  {
      type: String,
      default:false
        
    },




}, {
    versionKey: false,
    timestamps: true

}
    )

const participantesModel = mongoose.model("participantes",participantesRace)

module.exports =participantesModel;






