require("dotenv").config();
const Model= require('./models.js')
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
console.log("conexion_db");


async function add_inscripcion(notification) {
   const Notificaton = new Model(notification)
   console.log("Notificaton", Notificaton);
       await Notificaton.save().catch((e)=>{
	    	//console.log(e)
	    	console.log("KEY DUPLICADADA")
	    });

}

async function get_races(race) {
	console.log("ME ejecuto desde store",race)
	 return Race = await Model.find(race).catch((e)=>{
	    	console.log("errror")
	    	console.log(e)
	    });
	console.log("Race",Race)

}





module.exports = {
get_races,
add_inscripcion, 


}


