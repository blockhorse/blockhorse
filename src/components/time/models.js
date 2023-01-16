const mongoose = require('mongoose');

const Schema = mongoose.Schema;






const bloques_leidos = new Schema ({

     id:  {
        type: String,
        index:true
    },
    currentTimeBlock: {
        type: Date,
      },
    TimeLastBlock: {
        type: Date,
      },
      
      action: {
        type: String,
      },
    lastBlock: {
        type: Number,
    
    },
    currentBlock: {
        type: Number,
        
    },

},
 {
    versionKey: false,
    timestamps: true
}
);
const Model = mongoose.model("bloques_leidos",bloques_leidos)

module.exports = Model;






