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
    const { latest, page, type } = body;
    let races;

    if (latest) {
      console.log("latest")
      // Obtener las últimas 20 carreras existentes
      races = await store.get_races({}, { limit: 20, sort: { _id: -1 } });
    } else if (page) {
      console.log("page",page, type)

      // Paginar las carreras de 20 en 20
      const pageSize = 25;


      // races = await store.get_races({ limit: pageSize, tipo_carrera:type, status:!close sort: { _id: -1 } });
races = await store.get_races({
  limit: pageSize,
  query: { tipo_carrera: type, status: { $ne: "close" } },
  sort: { _id: -1 }
});

    } else {
      console.log("else")

      // Obtener todas las carreras
      races = await store.get_races({});
    }
      // console.log("RACES AQUI ESTAS", races)
    return races;
  } catch (error) {
    console.error('Error al obtener las carreras:', error);
    throw new Error('Error al obtener las carreras');
  }
}




async function get_race(body){
  console.log("body En Equino Controler", body);
return new Promise((resolve,reject) =>{
resolve(store.get_race(body))
//console.log("menssage body desde get hive pay", body);
 })

}


module.exports = {
 get_race,
 get_races
}


























