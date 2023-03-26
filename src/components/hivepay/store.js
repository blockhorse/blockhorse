require("dotenv").config();
const Model= require('./models.js')
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
   const Notificaton = new Model(notification)
   console.log("Notificaton", Notificaton);
       await Notificaton.save().catch((e)=>{
	    	//console.log(e)
	    	console.log("KEY DUPLICADADA")
	    });

}

async function get_Notification(notification) {
	console.log("ME ejecuto desde store",notification)
	 return Notification =await Model.find(notification).catch((e)=>{
	    	console.log("errror")
	    	console.log(e)
	    });
	

console.log("Notificaton desde store",Notification)

}


async function check_hive_pay(param) {
console.log("CHEQUEANDO PAGO ",param);
	 const  Verificacion = await Model.findOne({txid: param.txid}).catch((e)=>{
	   	console.log(e)
	    });

    console.log("Verificacion",Verificacion)
	 Verificacion.checked=param.checked;
	 Verificacion.save();
	

}



module.exports = {
add: add_Registro,
get: get_Notification, 
_check_pay: check_hive_pay,

}


