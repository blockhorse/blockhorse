const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const  chest = new Schema(
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
 usuario:  {
        type: String,

    },

     amount:  {
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

       checked:  {
      type: String,
      default:false
        
    },




}, {
    versionKey: false,
    timestamps: true

}
    )

const chestModel = mongoose.model("chest",chest)

module.exports =chestModel;






