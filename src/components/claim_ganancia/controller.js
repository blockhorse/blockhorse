 const store = require('./store.js');

async function get_claims(body) {
  console.log("BODY DEJUSTOPOP", body);

  const usuario=body.usuario

if(body.ganancia_apuestas){
 console.log("claim_balance_apuestas")
  return new Promise(async (resolve, reject) => {
    try {
      const claims = await store.get_claim({usuario});
      console.log("claims", claims);
       balance_en_wallet=claims[0].ganancia_apuestas;
       status_retiro_bhrt=claims[0].status_claim_ganancia
       console.log("balance_en_wallet", balance_en_wallet);
       console.log("body.ganancia_apuestas", body.ganancia_apuestas);
      // Verificar si la respuesta del store es un array vacío
      if (balance_en_wallet.toFixed(2) == body.ganancia_apuestas ){
        
        console.log("CLAIM ES CERO");
         console.log("NOENTRE")
        // Aquí puedes agregar la lógica para registrar los datos enviados en lugar de devolver el array vacío
        // Por ejemplo, puedes guardar los datos en una base de datos o hacer otra acción
        // Si la acción se realiza con éxito, puedes resolver la promesa con un mensaje de éxito
        if((status_retiro_bhrt!=="pending" ) && (status_retiro_bhrt!=="pendiente") && (status_retiro_bhrt!=="pendingBHR" )){
          console.log("ENTRE")
          await store.register_claim([{usuario:body.usuario},{status_claim_ganancia:'pending'}]);
        let respues=`You have successfully submitted a withdrawal request for  ${balance_en_wallet.toFixed(2)} tokens`
        resolve(respues);          
        }
            console.log("BaLANCES");
           
          let respuesta = "You must wait for the withdrawal to be processed";
        resolve(respuesta);
      } else {
      let respues=`${body.ganancia_apuesta} Error Balance`
        resolve(respues);  

      }
    } catch (error) {
      reject(error); // Manejar cualquier error que ocurra durante el registro o la obtención de datos
    }
  });

}



if (body.canje_apuestas_consuelo) {
  console.log("body.canje_apuesta_consuelo", body);

  return new Promise(async (resolve, reject) => {


    try {
      const claims = await store.get_claim({ usuario });
      // console.log("claims", claims);
      const balance_en_consuelo =
        claims[0].ganancias_apuestas_segundoLugar +
        claims[0].ganancias_apuestas_tercerLugar +
        claims[0].ganancias_apuestas_quintoLugar +
        claims[0].ganancias_apuestas_sextoLugar;
      const status_retiro_bhrt = claims[0].status_claim_ganancia_consolacion;



      console.log("status_retiro_bhrt", status_retiro_bhrt);
      console.log("balance_en_wallet_consuelo", balance_en_consuelo);

      if (status_retiro_bhrt === "free" ) {

       if (balance_en_consuelo === body.balance){
        if (balance_en_consuelo >= body.canje_apuestas_consuelo) {
          console.log("todo en orden");
         body.balance_api=balance_en_consuelo;

          
      try {
            const registroGuardado = await store.register_claim_consuelo(body);
            await store.register_claim([{usuario:body.usuario},{ balance_api:balance_en_consuelo, status_claim_ganancia_consolacion:'pendiente'}]);
            const response = {
              success: true,
              data: {
                body: "Successful transaction", // Mensaje o información de éxito
                result: registroGuardado // Aquí puedes incluir los datos adicionales que desees enviar
              }
            };
            resolve(response); // Resuelve con el objeto de respuesta exitosa
          } catch (error) {
            console.error("Error al registrar el reclamo:", error);
            const response = {
              success: false,
                 data: {
                body: "Error transaction", // Mensaje o información de éxito
                result: "Error al registrar"
              }// Mensaje de error
            };
            resolve(response); // Rechaza con el objeto de respuesta de error
          }
        } else {
          console.log("saldo insuficiente");
          const response = {
            success: false,
               data: {
                body: "Insufficient balance", // Mensaje o información de éxito
                result: "Error de saldo" // Aquí puedes incluir los datos adicionales que desees enviar
              }// Mensaje de error
          };
          resolve(response); // Rechaza con el objeto de respuesta de error
        }

      }else{"Balance no coincide"}
      } else {
        console.log("status_retiro_bhrt ya es pendiente");
        const response = {
          success: false,
          data: {
                body: "You must wait for the transaction to be processed", // Mensaje o información de éxito
                result: "Esperando" // Aquí puedes incluir los datos adicionales que desees enviar
              }// Mensaje de error
        };
   
        resolve(response); // Rechaza con el objeto de respuesta de error
      }
    } catch (error) {
      console.error("Error al obtener los reclamos:", error);
      const response = {
        success: false,
          data: {
                body: "Error", // Mensaje o información de éxito
                result: "No se obtvo datos" // Aquí puedes incluir los datos adicionales que desees enviar
              }// Mensaje de error
      };
      resolve(response); // Rechaza con el objeto de respuesta de error
    }
  });
}











if(body.ganancia_apuestas_consuelo){

console.log("aqui viene el consuelo de apuesta")



  return new Promise(async (resolve, reject) => {
    try {
      const claims = await store.get_claim({usuario});
      console.log("claims", claims);
       balance_en_consuelo=claims[0].ganancias_apuestas_segundoLugar + claims[0].ganancias_apuestas_tercerLugar+ claims[0].ganancias_apuestas_quintoLugar+ claims[0].ganancias_apuestas_sextoLugar;
       status_retiro_bhrt=claims[0].status_claim_ganancia_consolacion


       
       console.log("balance_en_wallet_consuelo", balance_en_consuelo);
       console.log("body.ganancia_apuestas", body.ganancia_apuestas_consuelo);
      // Verificar si la respuesta del store es un array vacío
      if (balance_en_consuelo.toFixed(2) == body.ganancia_apuestas_consuelo ){
        console.log("CLAIM ES CERO");
        // Aquí puedes agregar la lógica para registrar los datos enviados en lugar de devolver el array vacío
        // Por ejemplo, puedes guardar los datos en una base de datos o hacer otra acción
        // Si la acción se realiza con éxito, puedes resolver la promesa con un mensaje de éxito
        if((status_retiro_bhrt!=="pending" ) && (status_retiro_bhrt!=="pendiente" )){
       
          await store.register_claim([{usuario:body.usuario},{status_claim_ganancia_consolacion:'pending'}]);
          let respues=`You have successfully submitted a withdrawal request for  ${balance_en_consuelo} tokens`
            resolve(respues);          
        }
   
        let respuesta = "You must wait for the withdrawal to be processed";
        resolve(respuesta);
      } else {
      let respues=`${body.ganancia_apuesta} Error Balance`
        resolve(respues);  

      }
    } catch (error) {
      reject(error); // Manejar cualquier error que ocurra durante el registro o la obtención de datos
    }
  });
}















if (body.canje_apuestas_consuelo_bhr) {
  console.log("body.canje_apuesta_consuelo", body);

  return new Promise(async (resolve, reject) => {


    try {
      const claims = await store.get_claim({ usuario });
      console.log("claims", claims);
      const balance_en_consuelo_bhr =claims[0].ganancias_apuestas_cuartoLugar
      const status_retiro_bhrt = claims[0].status_claim_ganancia_consolacion;
      console.log("status_retiro_bhrt", status_retiro_bhrt, usuario);
      console.log("body.balance)", body.balance);
      console.log("balance_en_wallet_consuelo", balance_en_consuelo_bhr);
      if (status_retiro_bhrt === "free" ) {
        console.log("status: free")

      if (balance_en_consuelo_bhr >= body.canje_apuestas_consuelo_bhr) {
          console.log("todo en orden");
       body.balance_api=balance_en_consuelo_bhr;
          try {
            const registroGuardado = await store.register_claim_consuelo(body);
            await store.register_claim([{usuario:body.usuario},{status_claim_ganancia_consolacion:'pendiente'}]);
            const response = {
              success: true,
              data: {
                body: "Successful transaction", // Mensaje o información de éxito
                result: registroGuardado // Aquí puedes incluir los datos adicionales que desees enviar
              }
            };
            resolve(response); // Resuelve con el objeto de respuesta exitosa
          } catch (error) {
            console.error("Error al registrar el reclamo:", error);
            const response = {
              success: false,
                 data: {
                body: "Error transaction", // Mensaje o información de éxito
                result: "Error al registrar"
              }// Mensaje de error
            };
            resolve(response); // Rechaza con el objeto de respuesta de error
          }
        } else {
          console.log("saldo insuficiente");
          const response = {
            success: false,
               data: {
                body: "Insufficient balance", // Mensaje o información de éxito
                result: "Error de saldo" // Aquí puedes incluir los datos adicionales que desees enviar
              }// Mensaje de error
          };
          resolve(response); // Rechaza con el objeto de respuesta de error
        }


      } else {
        console.log("status_retiro_bhrt ya es pendiente");
        const response = {
          success: false,
          data: {
                body: "You must wait for the transaction to be processed", // Mensaje o información de éxito
                result: "Esperando" // Aquí puedes incluir los datos adicionales que desees enviar
              }// Mensaje de error
        };
   
        resolve(response); // Rechaza con el objeto de respuesta de error
      }
    } catch (error) {
      console.error("Error al obtener los reclamos:", error);
      const response = {
        success: false,
          data: {
                body: "Error", // Mensaje o información de éxito
                result: "No se obtuvo datos" // Aquí puedes incluir los datos adicionales que desees enviar
              }// Mensaje de error
      
      };
      resolve(response); // Rechaza con el objeto de respuesta de error
    }
  });
}









if(body.ganancia_apuestas_consuelo_bhr){

console.log("aqui viene el consuelo de apuesta")



  return new Promise(async (resolve, reject) => {
    try {
      const claims = await store.get_claim({usuario});
      console.log("claims", claims);
       balance_en_consuelo=claims[0].ganancias_apuestas_cuartoLugar;
       status_retiro_bhrt=claims[0].status_claim_ganancia_consolacion

          console.log("body.usuario", body.usuario);
       
       console.log("balance wallet BHR", balance_en_consuelo);
       console.log("confirmacion desde la cuenta hive", body.ganancia_apuestas_consuelo_bhr);
      // Verificar si la respuesta del store es un array vacío
      if (balance_en_consuelo.toFixed(2) == body.ganancia_apuestas_consuelo_bhr.toFixed(2) ){
        console.log("Los Balances se corresponden");
        // Aquí puedes agregar la lógica para registrar los datos enviados en lugar de devolver el array vacío
        // Por ejemplo, puedes guardar los datos en una base de datos o hacer otra acción
        // Si la acción se realiza con éxito, puedes resolver la promesa con un mensaje de éxito
        if((status_retiro_bhrt!=="pending" ) && (status_retiro_bhrt!=="pendiente") && (status_retiro_bhrt!=="pendingBHR" )){
       
          await store.register_claim([{usuario:body.usuario},{status_claim_ganancia_consolacion:'pendingBHR'}]);
          
          let respues=`You have successfully submitted a withdrawal request for  ${balance_en_consuelo} BHR tokens`
            resolve(respues);          
        }
   
        let respuesta = "You must wait for the withdrawal to be processed";
        resolve(respuesta);
      } else {
      let respues=`${body.ganancia_apuesta} Error Balance`
        resolve(respues);  

      }
    } catch (error) {
      reject(error); // Manejar cualquier error que ocurra durante el registro o la obtención de datos
    }
  });
}



}


module.exports = {
 get_claims,
}
