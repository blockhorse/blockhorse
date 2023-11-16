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
       status_retiro=claims[0].status_claim_ganancia
       console.log("balance_en_wallet", balance_en_wallet);
       console.log("body.ganancia_apuestas", body.ganancia_apuestas);
      // Verificar si la respuesta del store es un array vacío
      if (balance_en_wallet.toFixed(2) == body.ganancia_apuestas ){
        
        console.log("CLAIM ES CERO");
        // Aquí puedes agregar la lógica para registrar los datos enviados en lugar de devolver el array vacío
        // Por ejemplo, puedes guardar los datos en una base de datos o hacer otra acción
        // Si la acción se realiza con éxito, puedes resolver la promesa con un mensaje de éxito
        if(status_retiro!=="pending"){
       
          await store.register_claim([{usuario:body.usuario},{status_claim_ganancia:'pending'}]);
        let respues=`You have successfully submitted a withdrawal request for  ${body.ganancia_apuesta} tokens`
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


if(body.ganancia_apuestas_consuelo){

console.log("aqui viene el consuelo de apuesta")



  return new Promise(async (resolve, reject) => {
    try {
      const claims = await store.get_claim({usuario});
      console.log("claims", claims);
       balance_en_consuelo=claims[0].ganancias_apuestas_segundoLugar + claims[0].ganancias_apuestas_tercerLugar;
       status_retiro_bhrt=claims[0].status_claim_ganancia_consolacion


       
       console.log("balance_en_wallet_consuelo", balance_en_consuelo);
       console.log("body.ganancia_apuestas", body.ganancia_apuestas);
      // Verificar si la respuesta del store es un array vacío
      if (balance_en_consuelo.toFixed(2) == body.ganancia_apuestas_consuelo ){
        
        console.log("CLAIM ES CERO");
        // Aquí puedes agregar la lógica para registrar los datos enviados en lugar de devolver el array vacío
        // Por ejemplo, puedes guardar los datos en una base de datos o hacer otra acción
        // Si la acción se realiza con éxito, puedes resolver la promesa con un mensaje de éxito
        if(status_retiro_bhrt!=="pending"){
       
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


}





module.exports = {
 get_claims,
}
