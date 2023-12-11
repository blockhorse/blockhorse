const store = require('./store.js');




async function get_equino(body){
console.log("BODY get_equino", body)
return new Promise((resolve,reject) =>{
resolve(store.get_equino(body))

 })

}


async function post_equino(body){
console.log("BODY post_equino", body)

if(body.response.error){
    console.log("body.error post_equino", body.response.error);

    return body.response.error
}else{
      console.log("BODYpostequinoelse",body)
    
    if(body.response){

    console.log("BODYpostequinoelse",body)


    }

    


}
// return new Promise((resolve,reject) =>{
// resolve(store.get_equino(body))

//  })

}







async function registrar_cambio_de_nombre(body,newname){


const memo = body.response.data.memo;
console.log("memo", memo);
// Usando expresiones regulares para encontrar el número de Mint
const match = memo.match(/Mint: (\d+)/);

// Comprobando si hay una coincidencia y extrayendo el número Mint si existe
if (match) {
  const mintNumber = match[1];
  console.log('Número Mint:', mintNumber);

const equino= await store.get_equino({equineId:mintNumber})
console.log("equino", equino);

    console.log("equino.account==body.response.data.username", equino[0].account,body.response.data.username);
if(equino[0].account==body.response.data.username){



return new Promise((resolve, reject)=> {


console.log("body notificacion desde keychain",body)

const menssage=body.response.message
console.log("menssage de esta mierda", menssage);
const texto='La transacción ha sido transmitida con éxito. Por favor, compruebe su saldo para confirmar que ha sido procesada con éxito.'
if(menssage==texto){
let data = {
  trx_Registro: body.response.result.tx_id,
  memo: body.response.data.memo,
  usuario: body.response.data.username,
  equineId: mintNumber,
  monto: body.response.data.amount,
  dia: new Date().toISOString()
};

let datos = [
  { equineId: Number(mintNumber) },
  { nameBhr: newname, namesBhr: [] } // Inicializa namesBhr como un arreglo vacío
];

datos[1].namesBhr.push(data); // Agrega el objeto data al arreglo namesBhr

resolve(store.set_equino_status(datos));


}})



} else{ console.log("CUENTA QUE ENVIA LA TRANSACCION Y DUENO DEL EQUINO NO COINCIDEN")}

} else {
  console.log('Número Mint no encontrado en el memo.');
}


}


module.exports = {
 get_equino,
 post_equino,
 registrar_cambio_de_nombre
}


























