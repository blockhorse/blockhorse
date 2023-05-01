require("dotenv").config();
const {payhiveModel,chest_buyModel}= require('./models.js')
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
console.log("conexion_db");


async function add_Registro(notification) {
   const Notificaton = new payhiveModel(notification)
   console.log("Notificaton", Notificaton);
       await Notificaton.save().catch((e)=>{
	    	//console.log(e)
	    	console.log("KEY DUPLICADADA")
	    });

}

async function get_Notification(notification) {
	//console.log("ME ejecuto desde store",notification)
	 return Notification =await payhiveModel.find(notification).catch((e)=>{
	    	console.log("errror")
	    	console.log(e)
	    });
	

console.log("Notificaton desde store",Notification)

}


function getChestsForUser(user) {
return chest_buyModel.findOne({ usuario: user }).exec();
}



async function check_hive_pay(param) {
console.log("CONFIRMANDO  PAGO ",param);
	 const  Verificacion = await payhiveModel.findOne({txid: param.txid}).catch((e)=>{
	   	console.log(e)
	    });

    console.log("Verificacion",Verificacion)
	 Verificacion.checked=param.checked;
	 Verificacion.save();
	

}



// async function add_chest_pay(usuario,amount){


//   const filter = { usuario };
//   const update = { $inc: { cofres_compradas: amount } };
//   const options = { upsert: true };

//   await chest_buyModel.findOneAndUpdate([filter, update, options]);


// }  


async function add_chest_pay(usuario, amount) {
	console.log("usuario, amount", usuario, amount);
  const filter = { usuario };
  const update = { $inc: { cofres_compradas: amount } };
  const options = { upsert: true };

  await chest_buyModel.findOneAndUpdate(filter, update, options);
}


module.exports = {
add: add_Registro,
get: get_Notification, 
_check_pay: check_hive_pay,
add_chest: add_chest_pay,
 getChestsForUser

}


