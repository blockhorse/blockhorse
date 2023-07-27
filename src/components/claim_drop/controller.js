const store = require('./store.js');









async function get_claims(body) {
  console.log("BODY DEJUSTP", body);

  return new Promise(async (resolve, reject) => {
    try {
      const claims = await store.get_claim(body);

      // Verificar si la respuesta del store es un array vacío
      if (Array.isArray(claims) && claims.length === 0) {
        console.log("CLAIM ES CERO");
        // Aquí puedes agregar la lógica para registrar los datos enviados en lugar de devolver el array vacío
        // Por ejemplo, puedes guardar los datos en una base de datos o hacer otra acción
        // Si la acción se realiza con éxito, puedes resolver la promesa con un mensaje de éxito
        await store.register_claim(body);
        let respues=`You have successfully submitted a withdrawal request for  ${body.balance_drops} tokens`
        resolve(respues);
      } else {
        // Si la respuesta del store no es un array vacío, simplemente resolvemos la promesa con los datos obtenidos
        let respuesta = "You must wait for the withdrawal to be processed";
        resolve(respuesta);
      }
    } catch (error) {
      reject(error); // Manejar cualquier error que ocurra durante el registro o la obtención de datos
    }
  });
}





module.exports = {
 get_claims,
}
