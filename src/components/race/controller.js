const store = require('./store.js');


async function add_hivepay_notification(body){
return new Promise((resolve, reject)=> {

console.log("body notificacion desde hive",body)


let data={
    raceid: body.payment_details.txid,
   

    }


console.log("data", data);

//console.log("menssage body", body);

resolve(store.add(data))

})

}


async function get_races(body) {
  try {
    const { latest, page } = body;
    let races;

    if (latest) {
      // Obtener las últimas 20 carreras existentes
      races = await store.get_races({}, { limit: 20, sort: { _id: -1 } });
    } else if (page) {
      // Paginar las carreras de 20 en 20
      const pageSize = 20;
      const skip = (page - 1) * pageSize;
      races = await store.get_races({}, { limit: pageSize, skip, sort: { _id: -1 } });
    } else {
      // Obtener todas las carreras
      races = await store.get_races({});
    }

    return races;
  } catch (error) {
    console.error('Error al obtener las carreras:', error);
    throw new Error('Error al obtener las carreras');
  }
}




async function get_race(body){
  console.log("body En Equino Controler", body);
return new Promise((resolve,reject) =>{
resolve(store.get_races(body))
//console.log("menssage body desde get hive pay", body);
 })

}


module.exports = {
 get_race,
 get_races
}


























