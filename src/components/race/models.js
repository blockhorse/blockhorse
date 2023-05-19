const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const raceSchema= new Schema(
{
    raceid: {
        type: Number,
        required: true,
        validate: {
            isAsync: true,
            validator: function(value, isValid ){
                const self = this;
                return self.constructor.findOne({ txid: value })
                .exec(function(err, txid){
                    if(err){
                        throw err;
                    }
                    else if(txid) {
                        if(self.id === txid.id) {  // if finding and saving then it's valid even for existing email
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
       tipo:{
        type: String,
        

    },

     grado: {
        type: String,

    },
    name: {
        type: String,
    },
    registrados: {
        type: Array,
    },

     PorcentajePool: {
        type: Number,
    },

    CuentaPool: {
        type: String,
       
    },
     maxParticipantes: {
        type: Number,
       
    },
    tiempodesalida: {
        type: Date,
        
    },
    costo_registro: {
        type: Number,
        
    },
   
    premiostotal_1: {
        type: Number,
    },
    symbol_1: {
        type: String,
        
    },
  


     premiostotal_2: {
        type: Number,
        
    },


   symbol_2: {
   	  type: String,
        
    },

    premiostotal_3:{
   	  type: Number,
       
    },
     symbol_3:{
   	  type: String,
        
    },
    Puestos_Pagos_1:{
   	  type: Array,
       
    },
    Puestos_Pagos_2:  {
   	  type: Array,
        
    },
    Puestos_Pagos_3: {
   	  type: Array,
        
    },
    trxResultados:  {
   	  type: String,
        
    },
       status:  {
   	  type: String,
   	  default:"create"
        
    },




}, {
    versionKey: false,
    timestamps: true

}
	)

const raceModel = mongoose.model("race",raceSchema)

module.exports = raceModel;






