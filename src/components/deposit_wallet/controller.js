//const store = require('./store.js');
const storeW= require('./../wallet/store.js')
const ModelW= require('./../wallet/models.js')
const Model= require('./../wallet/models.js')


async function agregar_deposito(body) {
  console.log("BODY DEJUSTP", body);

// const{equinoId, cantidadTickets,nombreEquino,race,usuario}=body;
// console.log("De back : cantidadTickets,nombreEquino,race,owner", cantidadTickets,nombreEquino,race,usuario);



// const wallet= await storeW.get_wallet({usuario:usuario})
// console.log("wallet TTTTTTTT", wallet);




// const raceactives=await buscar_apuestas({race : race})
// const statusSuperior = raceactives[0]._doc.status_superior;
// console.log("statusSuperior", statusSuperior);





// if(statusSuperior==="create"){
  
// if(wallet){
// const balance=wallet[0].balance;
//  console.log("balance", balance);
//  const bet=cantidadTickets/100;
//  console.log("bet", bet);

//  saldo=balance - bet;
//   if(balance>=bet){
// //descontar_balace sumar a apuesta en carrera
//    await ModelW.findOneAndUpdate(
//   { usuario: usuario },
//   { $inc: { balance: -bet } } // Use -bet to decrement the balance
// );

// //sumar a apuestas en carreras tabla apuesta
// const agregando_puesta= await store.agregarApuesta(equinoId,bet, nombreEquino, race, usuario);


//   }else{
//     return("Insufficient funds")
//   }


// }else{return("Wallet not found")}


// }else{

//   return("race closed, in progress")
// }



  return(`trx Success, balance: ${saldo.toFixed(3)}`)
}



async function buscar_apuestas(body){
console.log("BODY DEJUSTP", body)
return new Promise((resolve,reject) =>{
resolve(store.buscar_apuestas(body))

 })

}




module.exports = {
 agregar_deposito,
 buscar_apuestas
}
