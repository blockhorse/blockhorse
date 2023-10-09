const apuestas_ganador= new Schema({
 race:  {
        type: Number,
    index:true,
    unique:true 
    },
  apuestas:Object,
  pagando:Object,
  ganador:Number,
  ganador_name:String,
  Total_Pote:Number,
  status:String,
  despachado:{type:Boolean, default:false},
   createdAt: {
    type: Date,
    default: Date.now, // Establece la fecha y hora actual como valor predeterminado
  },
     updatedAt: {
    type: Date,
    default: Date.now, // Establece la fecha y hora actual como valor predeterminado
  },
  

}, {
    
    autoIndex:false,
    autoCreate: false,
});