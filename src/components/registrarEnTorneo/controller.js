const store = require('./store.js');





async function registrarEnTorneo(body) {
  console.log("body En Torneo Controler", body);
  console.log("BODY DEJUSTP", body);

  const usuario = body.habilitador;
  const token = body.token;
  const costo_inscripcion = body.costo;

  return new Promise(async (resolve, reject) => {
    try {
      const wallet = await store.get_wallet({ usuario: usuario });
      const torneo = await store.get_torneo({ status_inscriciones: "abierto" }); 
      const equine = await store.get_equino({equineId:body.identidad})

      console.log("wallet", wallet);
      console.log("torneo", torneo);

      const hiveBalance = wallet[0].balance - wallet[0].retiros;
      const status_retiro = wallet[0].status_retiro;
      const bhrtBalance = (
        (wallet[0].ganancias_apuestas_segundoLugar || 0) +
        (wallet[0].ganancias_apuestas_tercerLugar || 0) +
        (wallet[0].ganancias_apuestas_quintoLugar || 0) +
        (wallet[0].ganancias_apuestas_sextoLugar || 0)
      ).toFixed(2);
      const bhrBalance = (wallet[0].ganancias_apuestas_cuartoLugar || 0).toFixed(3);

      if (status_retiro !== "pending" && status_retiro !== "whitdrawing") {
        if (token === "BHRT") {
          const status_retiro_bhrt = wallet[0].status_claim_ganancia_consolacion;
          if (
            bhrtBalance >= costo_inscripcion &&
            status_retiro_bhrt !== "pending" &&
            status_retiro_bhrt !== "pendiente" &&
            status_retiro_bhrt !== "pendingBHR"
          ) {
            const result = await procesar_inscripcion(body, bhrtBalance, torneo,equine);
              console.log("Todo está a Bien este es res (result)",result);
              resolve(result);
           
          } else {
            resolve({
              statusCode: 400,
              message: "Insufficient balance for BHRT",
            });
          }
        }

        if (token === "BHR") {
          if (bhrBalance >= costo_inscripcion) {
            const result = await procesar_inscripcion(body, bhrBalance, torneo,equine);
            if (result === true) {
              resolve({
                statusCode: 200,
                message: "Registration processed successfully",
              });
            } else {
              resolve({
                statusCode: 400,
                message: "An error occurred during the registration process",
              });
            }
          } else {
            resolve({
              statusCode: 400,
              message: "Insufficient balance for BHR",
            });
          }
        }

        if (token === "SWAP.HIVE") {
          if (hiveBalance >= costo_inscripcion) {
            const result = await procesar_inscripcion(body, hiveBalance, torneo,equine);
            if (result === true) {
              resolve({
                statusCode: 200,
                message: "Registration processed successfully",
              });
            } else {
              resolve({
                statusCode: 400,
                message: "An error occurred during the registration process",
              });
            }
          } else {
            resolve({
              statusCode: 400,
              message: "Insufficient balance for SWAP.HIVE",
            });
          }
        }
      } else {
        resolve({
          statusCode: 400,
          message: "You must wait for the withdrawal to be processed",
        });
      }
    } catch (error) {
      console.error("Error caught in registrarEnTorneo:", error); // Para ayudar con la depuración
      reject({
        statusCode: 500,
        message: "An error occurred during the tournament registration process",
        error: error.message,
      });
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
  } else {
    
      return({
                statusCode: 400,
                message: "El estado oficial no es válido para la inscripción",
              });
  }




if(data.status_oficial==="S"){

  if(data.account!=data.habilitador){


  }else{

  return "Lo sentimos pero ya no es posible que registres este Nft en el Torneos"
  }


    
  }


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
let registro={equineId:data.identidad, habilitador:data.habilitador,costo:data.costo,token:data.token}

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

const body ={equineId:data.identidad,usuario:data.habilitador}

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


























