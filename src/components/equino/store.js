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


async function get_equino(equino) {
	console.log("ME ejecuto desde store get equino",equino)
	 return Equino = await Model.find(equino).catch((e)=>{
	    	console.log("errror")
	    	console.log(e)
	    });
	console.log("EQU",Equino)

}


async function set_equino_status(equino) {
	console.log("SETEANDO ",equino)
	 return Equino = await Model.findOneAndUpdate(equino[0],equino[1]).catch((e)=>{
	    	console.log("errror")
	    	console.log(e)
	    });
	console.log("EQU",Equino)

}









module.exports = {

get_equino, 
set_equino_status,


}


