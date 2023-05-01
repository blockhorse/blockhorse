const store = require('./store.js');


async function set_buy(body){
return new Promise((resolve, reject)=> {

console.log("body notificacion desde hive",body)


const menssage=body.message
console.log("menssage de esta mierda", menssage);
const texto='La transacción ha sido transmitida con éxito. Por favor, compruebe su saldo para confirmar que ha sido procesada con éxito.'





if(menssage==texto){

let data={
     trx_Registro:body.result.tx_id,
     usuario: body.data.username,  
     amount: body.data.amount, 
     validacion_Registro:false,
     devolucion_Registro:false,

    }



resolve(store.add_buy(data))

}})

}




module.exports = {
 set_buy,
}


























