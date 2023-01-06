const store = require('./store.js');
const store_equino = require('./../equino/store.js');

async function set_inscripcion(body){
return new Promise((resolve, reject)=> {

console.log("body notificacion desde hive",body)


const memo = body.data.memo;

const index = memo.indexOf("race") + "race".length;
const race = memo.substring(index);

// Utiliza una expresión regular para buscar un patrón que coincida con un número seguido de "in"
const pattern = /\b\d+\b in/;

// Utiliza el método match de String para buscar el patrón en el string
const match = memo.match(pattern);

const menssage=body.message
console.log("menssage de esta mierda", menssage);
const texto='La transacción ha sido transmitida con éxito. Por favor, compruebe su saldo para confirmar que ha sido procesada con éxito.'


let number=0
// Si se encuentra el patrón, extrae el número utilizando el método slice
if (match) {
   number = match[0].slice(0, -3);
  console.log(number);
}




if(menssage==texto){

let data={
     trx_Registro:body.result.id,
     carreraId:race,
     usuario: body.data.username,  
     equineId: number, 
     validacion_Registro:false,
     devolucion_Registro:false,

    }

let datos=[{equineId: Number(number)},{estado: "Procesando Inscripcion"}]


console.log("data", data);
store_equino.set_equino_status(datos);
//console.log("menssage body", body);

resolve(store.add_inscripcion(data))

}})

}

async function get_race(body){
return new Promise((resolve,reject) =>{
resolve(store.get_races(body))
//console.log("menssage body desde get hive pay", body);
 })

}


module.exports = {
 get_race,
 set_inscripcion,
}


























