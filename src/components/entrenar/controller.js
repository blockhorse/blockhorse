const { entrenarGratis_speed, entrenarGratis_endurance, Registrar_speed, Registrar_endurance, get_equino } = require("./store");

async function entrenar(reqbody) {
//  console.log("reqbodyYYYYYYY", reqbody);
let Gratis=Number(reqbody.g);
let numero=Number(reqbody.entrenamientoDisponible);
let equino=Number(reqbody.equineId)
let respuesta=null;

let equinex=await get_equino({equineId : reqbody.equineId})
//console.log("equinexXXXXXXXXXXXXXXXXXXXXXXX", equinex);


if(equinex[0].entrenamiento_gratis==Gratis && equinex[0].opcion_entrenamiento==numero){
 // entrenamiento_gratis: 1,
 //    opcion_entrenamiento: 0.01,




if(Gratis===1){
let aleatorio=numero_aleatorio(numero)
aleatorio=aleatorio.toFixed(5)

let habilidad=numero_aleatorio_A_B()
respuesta=[{pts:aleatorio,ability:habilidad}]

if(habilidad=="speed"){
let data={
     equineId:equino,
     speed: aleatorio,
     trx_nft: "00000",  
         }
await entrenarGratis_speed(data)
await Registrar_speed(data)
}else{

 let data={
     equineId:equino,
     endurance: aleatorio,
     trx_nft: "00000"  
         } 
await entrenarGratis_endurance(data)
await Registrar_endurance(data)
}

} 


}
console.log("respuesta", respuesta);
return respuesta
}










async function entrenar_pago(body) {
//  console.log("reqbodyYYYYYYY", reqbody);
let equino=null;
let Gratis=0;
let respuesta=null;

const memo = body && body.data && body.data.memo ? body.data.memo : "no memo";
console.log("memo", memo);
const numero = (Number(body.data.amount) * 10).toFixed(3);
console.log("numero", numero);
const menssage=body && body.message ? body.message : "sin mensaje"; 
const texto='La transacción ha sido transmitida con éxito. Por favor, compruebe su saldo para confirmar que ha sido procesada con éxito.'
// Make sure 'body' and 'body.result' are defined before accessing 'tx_id'
const trxId = body && body.result && body.result.tx_id ? body.result.tx_id : "01010101";

    

const patron = /horse (\d+)/;
const coincidencias = memo.match(patron);

if (coincidencias) {
     equino = parseInt(coincidencias[1]);
     equino =String(equino)
    console.log("equino", equino);
    console.log("Número encontrado:", numero);
} else {
    console.log("Número no encontrado en el texto.");
}




let equinex=await get_equino({equineId : equino})
//console.log("equinexXXXXXXXXXXXXXXXXXXXXXXX", equinex);
if(equinex[0].entrenamiento_gratis==Gratis && (equinex[0].opcion_entrenamiento).toFixed(3)==numero){
  console.log("equinex[0].opcion_entrenamiento", equinex[0].opcion_entrenamiento);
  //console.log("equinex[0].entrenamiento_grati", equinex[0].entrenamiento_gratis);
 // entrenamiento_gratis: 1,
 //    opcion_entrenamiento: 0.01,





let aleatorio=numero_aleatorio(equinex[0].opcion_entrenamiento)
aleatorio=Number(aleatorio).toFixed(5)

let habilidad=numero_aleatorio_A_B()
respuesta=[{pts:aleatorio,ability:habilidad}]

if(habilidad=="speed"){
let data={
     equineId:equino,
     speed: aleatorio,  
     trx_nft: trxId,
         }
await entrenarGratis_speed(data)
await Registrar_speed(data)
}else{

 let data={
     equineId:equino,
     endurance: aleatorio,
     trx_nft: trxId,  
         } 
await entrenarGratis_endurance(data)
await Registrar_endurance(data)




}

}
console.log("respuesta", respuesta);
return respuesta
}



function numero_aleatorio(numero) {
  const min = numero;
  const max = numero + numero / 10;
  return Math.random() * (max - min) + min;
}



function numero_aleatorio_A_B() {
  let random=Math.random() * 2
 let habilidad="endurance";
  if(random>=1){
  habilidad="speed"
  }
 
  return habilidad 
}

module.exports = {
  entrenar,
  entrenar_pago
};






