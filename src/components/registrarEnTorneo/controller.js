const store = require('./store.js');





// async function registrarEnTorneo(body) {
//      body.habilitado = 'si';
//      body.status_oficial = 'I';

//   console.log("body En Torneo Controler", body);
//   console.log("BODY DEJUSTP", body);



//   const usuario = body.habilitador;
//   const token = body.token;
//   const costo_inscripcion = body.costo;

//   return new Promise(async (resolve, reject) => {
//     try {
//       const wallet = await store.get_wallet({ usuario: usuario });
//       const torneo = await store.get_torneo({ status_inscriciones: "abierto" }); 
//       const equine = await store.get_equino({ equineId:body.equineId })

//       console.log("wallet", wallet);
//       console.log("torneo", torneo);
//       console.log("equine", equine);
//       const hiveBalance = wallet[0].balance - wallet[0].retiros;
//       const status_retiro = wallet[0].status_retiro;

//         console.log("status_retiro", status_retiro);
     
//       const bhrtBalance = (
//         (wallet[0].ganancias_apuestas_segundoLugar || 0) +
//         (wallet[0].ganancias_apuestas_tercerLugar || 0) +
//         (wallet[0].ganancias_apuestas_quintoLugar || 0) +
//         (wallet[0].ganancias_apuestas_sextoLugar || 0)
//       ).toFixed(2);
//       const bhrBalance = (wallet[0].ganancias_apuestas_cuartoLugar || 0).toFixed(3);

//       if (status_retiro !== "pending" && status_retiro !== "whitdrawing") {
//         if (token === "BHRT") {
//           const status_retiro_bhrt = wallet[0].status_claim_ganancia_consolacion;
//           if (
//             bhrtBalance >= costo_inscripcion &&
//             status_retiro_bhrt !== "pending" &&
//             status_retiro_bhrt !== "pendiente" &&
//             status_retiro_bhrt !== "pendingBHR"
//           ) {
//             const result = await procesar_inscripcion(body, bhrtBalance, torneo,equine);
//               console.log("Todo está a Bien este es res (result)",result);
//               resolve(result);
           
//           } else {
//             resolve({
//               statusCode: 400,
//               message: "Insufficient balance for BHRT",
//             });
//           }
//         }

//         if (token === "BHR") {
//           if (bhrBalance >= costo_inscripcion) {
//             const result = await procesar_inscripcion(body, bhrBalance, torneo,equine);
//             if (result === true) {
//               resolve({
//                 statusCode: 200,
//                 message: "Registration processed successfully",
//               });
//             } else {
//               resolve({
//                 statusCode: 400,
//                 message: "An error occurred during the registration process",
//               });
//             }
//           } else {
//             resolve({
//               statusCode: 400,
//               message: "Insufficient balance for BHR",
//             });
//           }
//         }

//         if (token === "SWAP.HIVE") {
//           if (hiveBalance >= costo_inscripcion) {
//             const result = await procesar_inscripcion(body, hiveBalance, torneo,equine);
//             if (result === true) {
//               resolve({
//                 statusCode: 200,
//                 message: "Registration processed successfully",
//               });
//             } else {
//               resolve({
//                 statusCode: 400,
//                 message: "An error occurred during the registration process",
//               });
//             }
//           } else {
//             resolve({
//               statusCode: 400,
//               message: "Insufficient balance for SWAP.HIVE",
//             });
//           }
//         }
//       } else {
//         resolve({
//           statusCode: 400,
//           message: "You have a withdrawal on processed",
//         });
//       }
//     } catch (error) {
//       console.error("Error caught in registrarEnTorneo:", error); // Para ayudar con la depuración
//       reject({
//         statusCode: 500,
//         message: "An error occurred during the tournament registration process",
//         error: error.message,
//       });
//     }
//   });
// }




async function registrarEnTorneo(body) {
  body.habilitado = 'si';
  body.status_oficial = 'I';

  console.log("body En Torneo Controler", body);
  console.log("BODY DEJUSTP", body);

  const usuario = body.habilitador;
  const token = body.token;
  const costo_inscripcion = parseFloat(body.costo); // Asegúrate de que costo_inscripcion sea un número

  return new Promise(async (resolve, reject) => {
    try {
      const wallet = await store.get_wallet({ usuario });
      const torneo = await store.get_torneo({ status_inscriciones: "abierto" });
      const equine = await store.get_equino({ equineId: body.equineId });

      if (!wallet || wallet.length === 0) {
        return resolve({ statusCode: 404, message: "Wallet not found" });
      }
      if (!torneo) {
        return resolve({ statusCode: 404, message: "Tournament not found" });
      }
      if (!equine) {
        return resolve({ statusCode: 404, message: "Equine not found" });
      }

      console.log("wallet", wallet);
      console.log("torneo", torneo);
      console.log("equine", equine);

      const hiveBalance = wallet[0].balance - wallet[0].retiros;
      const status_retiro = wallet[0].status_retiro;

      console.log("status_retiro", status_retiro);

      const bhrtBalance = parseFloat(
        (wallet[0].ganancias_apuestas_segundoLugar || 0) +
        (wallet[0].ganancias_apuestas_tercerLugar || 0) +
        (wallet[0].ganancias_apuestas_quintoLugar || 0) +
        (wallet[0].ganancias_apuestas_sextoLugar || 0)
      );
      const bhrBalance = parseFloat(wallet[0].ganancias_apuestas_cuartoLugar || 0);

      if (status_retiro !== "pending" && status_retiro !== "whitdrawing") {
        if (token === "BHRT") {
          const status_retiro_bhrt = wallet[0].status_claim_ganancia_consolacion;
          if (
            bhrtBalance >= costo_inscripcion &&
            !["pending", "pendiente", "pendingBHR"].includes(status_retiro_bhrt)
          ) {
            const result = await procesar_inscripcion(body, bhrtBalance, torneo, equine);
            console.log("Todo está a Bien este es res (result)", result);
            resolve(result);
          } else {
            resolve({ statusCode: 400, message: "Insufficient balance for BHRT" });
          }
        }

        if (token === "BHR" && bhrBalance >= costo_inscripcion) {
          const result = await procesar_inscripcion(body, bhrBalance, torneo, equine);
          resolve(result ? { statusCode: 200, message: "Registration processed successfully" } : { statusCode: 400, message: "An error occurred during the registration process" });
        } else if (token === "BHR") {
          resolve({ statusCode: 400, message: "Insufficient balance for BHR" });
        }

        if (token === "SWAP.HIVE" && hiveBalance >= costo_inscripcion) {
          const result = await procesar_inscripcion(body, hiveBalance, torneo, equine);
          resolve(result ? { statusCode: 200, message: "Registration processed successfully" } : { statusCode: 400, message: "An error occurred during the registration process" });
        } else if (token === "SWAP.HIVE") {
          resolve({ statusCode: 400, message: "Insufficient balance for SWAP.HIVE" });
        }
      } else {
        resolve({ statusCode: 400, message: "You have a withdrawal in process" });
      }
    } catch (error) {
      console.error("Error caught in registrarEnTorneo:", error);
      reject({ statusCode: 500, message: "An error occurred during the tournament registration process", error: error.message });
    }
  });
}


async function get_torneo(body){
  console.log("body Torneo Get", body);


  return new Promise(async (resolve, reject) => {


    try {
      const torneo = await store.get_torneo(body);
          
        resolve(torneo);          
        
   
    } catch (error) {
      reject(error); // Manejar cualquier error que ocurra durante el registro o la obtención de datos
    }
  });



}
























































































// /// //  // 
// 
// 
// functionES   Adicionales
// 
// 
//////////////////

async function procesar_inscripcion(data, balanceEnW, torneo,equine) {
  console.log("data Inscripcion,", data, "balanceEnW BHRT", balanceEnW,"equine",equine,"torneo",torneo);
  console.log("equine", equine);
    console.log("equine[0].status_oficial", equine[0].status_oficial);

  if (equine[0].status_oficial === "M") {
    if (data.account === data.habilitador) {
      console.log("Habilitacion por el owner..");

      try {
        // Procesamos los canjes
        const set_canjes = await procesar_canje(data, balanceEnW, torneo);
        console.log("set_canjes Resultado", set_canjes);

        // Procesamos la inscripción al torneo
        const set_inscripcion_torneo = await inscripcion_torneo(data, torneo);
        console.log("set_inscripcion_torneo Resultado", set_inscripcion_torneo);

        // Registramos el equino
        const set_equino_inscrito = await equino_registro(data);
        console.log("set_equino_inscrito Resultado", set_equino_inscrito);

        // Actualizamos la wallet
        const set_wallet = await descontar_register_wallet(data, balanceEnW);
        console.log("set_wallet Resultado", set_wallet);

        // Verificamos que todas las operaciones hayan sido exitosas
        if (set_canjes && set_inscripcion_torneo && set_equino_inscrito && set_wallet) {
              return({
                statusCode: 200,
                message: "Registration processed successfully",
              });
              
            
        } else {
          return({
                statusCode: 400,
                message: "Error: Alguna de las operaciones falló",
              });
        }
      } catch (error) {
        console.error("Error al procesar la inscripción:", error);
              return({
                statusCode: 400,
                message: "Error: Ocurrió un problema durante el procesamiento",
              });
      }
    } else {
      
      return({
                statusCode: 400,
                message: "Existe un error: este Nft aún no está listo para registra",
              });
    }
  } else if(equine[0].status_oficial === "S") {
    console.log("equine[0].status_oficial", equine[0].status_oficial);
      console.log("Habilitacion por el Habilitador..", data.habilitador, "Owner", equine[0].account );

    if (data.account != data.habilitador) {
      console.log("Habilitacion por el Habilitador..");
  console.log("data Inscripcion,", data, "balanceEnW BHRT", balanceEnW,"equine",equine,"torneo",torneo);



      try {
        // Procesamos los canjes
        const set_canjes = await procesar_canje(data, balanceEnW, torneo);
        console.log("set_canjes Resultado", set_canjes);

        // Procesamos la inscripción al torneo
        const set_inscripcion_torneo = await inscripcion_torneo(data, torneo);
        // console.log("set_inscripcion_torneo Resultado", set_inscripcion_torneo);

        // Registramos el equino
        const set_equino_inscrito = await equino_registro(data);
        console.log("set_equino_inscrito Resultado", set_equino_inscrito);

        // Actualizamos la wallet
        const set_wallet = await descontar_register_wallet(data, balanceEnW);
        console.log("set_wallet Resultado", set_wallet);

        // Verificamos que todas las operaciones hayan sido exitosas
        if (set_canjes && set_inscripcion_torneo && set_equino_inscrito && set_wallet) {
              return({
                statusCode: 200,
                message: "Registration processed successfully",
              });
              
            
        } else {
          return({
                statusCode: 400,
                message: "Error: Alguna de las operaciones falló",
              });
        }
      } catch (error) {
        console.error("Error al procesar la inscripción:", error);
              return({
                statusCode: 400,
                message: "Error: Ocurrió un problema durante el procesamiento",
              });
      }
    } else {
      
      return({
                statusCode: 400,
                message: "Existe un error: este Nft aún no está listo para registra",
              });
    }
 



    }else {
    
      return({
                statusCode: 400,
                message: "El estado oficial no es válido para la inscripción",
              });
  }




// if(data.status_oficial==="S"){

//   if(data.account!=data.habilitador){


//   }else{

//   return "Lo sentimos pero ya no es posible que registres este Nft en el Torneos"
//   }


    
//   }


}








































































async function procesar_canje(data,balanceEnW,torneo){
let balanceRest=Number(balanceEnW) - Number(data.costo);
let torneo_n="torneo" + torneo[0].id_Torneo;
console.log("torneo.id_Torneo", torneo_n);

 const  body= {
      usuario: data.habilitador,
      articulo: torneo_n, 
      balance_real:balanceEnW,
      balance_restante:balanceRest,
      canje_costo:data.costo,
      symbol:data.token } ;

  
 
return new Promise(async (resolve, reject) => {

    try {
            const registroGuardado = await store.register_canje(body);
            
            resolve(registroGuardado); // Resuelve con el objeto de respuesta exitosa
          } catch (error) {
            console.error("Error al registrar el reclamo:", error);
          
            resolve(registroGuardado); // Rechaza con el objeto de respuesta de error
  
  }        
        
  });

}

  






async function inscripcion_torneo(data,torneo){
let id_Torneo=torneo[0].id_Torneo;
let equineId=data.identidad || data.equineId
let registro={equineId:equineId, habilitador:data.habilitador,costo:data.costo,token:data.token}

const  body= {
      id_Torneo: id_Torneo,
      registro: registro, 
      inscripcion_costo:data.costo,
      symbol:data.token } ;

  

return new Promise(async (resolve, reject) => {

    try {

       const registroG = await  store.register_torneo(body)
            
            resolve(registroG); // Resuelve con el objeto de respuesta exitosa
          } catch (error) {
            console.error("Error al registrar Inscripcion en Torneo:", error);
            
            resolve(registroG); // Rechaza con el objeto de respuesta de error
  
  }        
        
  });

}


async function equino_registro(data){
  console.log("equino registro function (data", data);

const body ={equineId:data.equineId,usuario:data.habilitador}

  return new Promise(async (resolve, reject) => {

    try {

       const registroGuarda = await  store.register_equino_torneo(body)
           
            resolve(registroGuarda); // Resuelve con el objeto de respuesta exitosa
          } catch (error) {
            console.error("Error al registrar Inscripcion en Torneo:", error);
            
            resolve(registroGuarda); // Rechaza con el objeto de respuesta de error
  
  }        
        
  });

}

async function descontar_register_wallet(data,balanceEnW){
let balanceRest=Number(balanceEnW) - Number(data.costo);

let canje = [{
  equineId: data.identidad,
  habilitador: data.habilitador,
  costo: data.costo,
  token: data.token,
  razon: "torneo",
  dia: new Date() // Esto genera un objeto Date con la fecha y hora actuales
}];

const body={usuario:data.habilitador,balance_restante:balanceRest,costo:data.costo,symbol:data.token,canje:canje}
return new Promise(async (resolve, reject) => {

    try {

       const registroGuardar = await  store.descontar_register_wallet(body)
            
            resolve(registroGuardar); // Resuelve con el objeto de respuesta exitosa
          } catch (error) {
            console.error("Error al registrar Inscripcion en Torneo:", error);
            
            resolve(registroGuardar); // Rechaza con el objeto de respuesta de error
  
  }        
        
  });
}


module.exports = {
 registrarEnTorneo,
 get_torneo
}











































// body En Torneo Controler {
//   trx_entrenmientos: [],
//   lastTrain: [],
//   last_training: [],
//   _id: '6461a6b237c0d61a23c7331c',
//   equineId: 23,
//   __v: 0,
//   account: 'aries.crycto',
//   agilidad: '118',
//   animo: '-100',
//   carreras_win: [
//     { trx_race: 47 },   { trx_race: 126 },  { trx_race: 126 },
//     { trx_race: 128 },  { trx_race: 191 },  { trx_race: 196 },
//     { trx_race: 252 },  { trx_race: 255 },  { trx_race: 299 },
//     { trx_race: 295 },  { trx_race: 385 },  { trx_race: 414 },
//     { trx_race: 522 },  { trx_race: 557 },  { trx_race: 604 },
//     { trx_race: 610 },  { trx_race: 670 },  { trx_race: 783 },
//     { trx_race: 801 },  { trx_race: 922 },  { trx_race: 969 },
//     { trx_race: 983 },  { trx_race: 1028 }, { trx_race: 1223 },
//     { trx_race: 1236 }, { trx_race: 1294 }, { trx_race: 1314 },
//     { trx_race: 1434 }, { trx_race: 1444 }, { trx_race: 1446 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 }, { trx_race: 1449 }, { trx_race: 1449 },
//     { trx_race: 1449 },
//     ... 58 more items
//   ],
//   name: 'noname00000023',
//   salud: '031',
//   sexo: 'F',
//   tipo: 'Rare',
//   Dia_descanzo: '1970-01-01T00:00:00.000Z',
//   Dia_D_update: '2024-06-30T18:42:09.176Z',
//   updatedAt: '2024-02-06T17:48:32.012Z',
//   Schedule: 0,
//   implementos: [ { '0': [Array] } ],
//   Dia_D_Alimento: '2024-10-28T00:00:00.000Z',
//   trx_nft: [ 'd1dc3373408f64f2c8bef6505fb5ff065c5030c8' ],
//   UltimoUpdateValidoCaballos: '2024-11-01T11:18:07.529Z',
//   nameBhr: 'ShiryudeDragn',
//   namesBhr: [
//     {
//       trx_Registro: 'decb1223d2cde2da0dfc99cb3b8f48fdef2cf79c',
//       memo: 'Mint: 23 Name will change to:ShiryudeDragn',
//       usuario: 'aries.crycto',
//       equineId: '23',
//       monto: '0.010',
//       dia: '2024-01-14T01:41:58.568Z'
//     }
//   ],
//   alimentado: false,
//   for_shedule_Oficiales: 'D0',
//   status_oficial: 'S',
//   habilitado: 'no',
//   carreras_Oficiales: [],
//   carreras_second_Oficiales: [],
//   carreras_third_Oficiales: [],
//   carreras_win_Oficiales: [],
//   habilitador: 'blockhorseracing',
//   token: 'BHRT',
//   costo: '300.000'
// }