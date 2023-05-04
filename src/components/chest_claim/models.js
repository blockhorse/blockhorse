const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const payhiveSchema= new Schema(
{
    txid: {
        type: String,
        lowercase: true,
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
    payment_successfu: {
        type: Boolean,

    },
    merchant: {
        type: String,

    },
    buyer: {
        type: String,
    },

     token: {
        type: String,
    },

    token_amount: {
        type: String,
       
    },
     amount_received: {
        type: String,
       
    },
    fee: {
        type: String,
        
    },
    item_name: {
        type: String,
        
    },
    hp_memo: {
        type: String,
    },
    item_tax: {
        type: String,
    },
    quantity: {
        type: String,
        
    },
     description: {
        type: String,
        
    },


   hivepaytype: {
   	  type: String,
        
    },

    discount_token:{
   	  type: String,
       
    },
    discount_amount:{
   	  type: String,
        
    },
    insert_id:{
   	  type: String,
       
    },
    third_party:  {
   	  type: String,
        
    },
    third_party_percent: {
   	  type: String,
        
    },
    third_party_memo:  {
   	  type: String,
        
    },
      entregado:  {
      type: Boolean,
      default:false  
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

const payhiveModel = mongoose.model("hivepay",payhiveSchema)


const chest_buy = new Schema({
  usuario: {
    type: String,
    index: true,
    unique: true 
  },
  llaves_compradas: {
    type: Number,
    default: 0
  },
  cofres_compradas: {
    type: Number,
    default: 0
  },
  cofres_procesando: {
    type: Number,
    default: 0
  },                   
  llaves_gastadas: {
    type: Number,
    default: 0
  },
  cofres_gastadas: {
    type: Number,
    default: 0
  },
   status: {
    type: String,
    default:"create"
  }
}, {
  autoIndex: false,
  autoCreate: false
});



const chest_buyModel = mongoose.model("chest_buy",chest_buy)

module.exports={ payhiveModel,chest_buyModel}






