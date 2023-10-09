const store = require('./store.js');
const storeW= require('./../wallet/store.js')








async function get_claims(body) {
  console.log("BODY DEJUSTP", body);

  return new Promise(async (resolve, reject) => {
    try {
      const claims = await store.get_claim(body);
      console.log("claims", claims);
       balance_en_wallet=claims[0].balance - claims[0].retiros
       status_retiro=claims[0].status_retiro
       console.log("balance_en_wallet", balance_en_wallet);
       console.log("body.balance", body.balance);
      // Verificar si la respuesta del store es un array vacío
      if (balance_en_wallet == body.balance ){
        
        console.log("CLAIM ES CERO");
        // Aquí puedes agregar la lógica para registrar los datos enviados en lugar de devolver el array vacío
        // Por ejemplo, puedes guardar los datos en una base de datos o hacer otra acción
        // Si la acción se realiza con éxito, puedes resolver la promesa con un mensaje de éxito
        if(status_retiro!=="pending"){
       
          await store.register_claim([{usuario:body.usuario},{status_retiro:'pending'}]);
        let respues=`You have successfully submitted a withdrawal request for  ${body.balance_drops} tokens`
        resolve(respues);          
        }
   
          let respuesta = "You must wait for the withdrawal to be processed";
        resolve(respuesta);
      } else {
      let respues=`${body.balance} Error Balance`
        resolve(respues);  

      }
    } catch (error) {
      reject(error); // Manejar cualquier error que ocurra durante el registro o la obtención de datos
    }
  });
}





module.exports = {
 get_claims,
}
