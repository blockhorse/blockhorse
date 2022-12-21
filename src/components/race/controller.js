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

async function get_race(body){
return new Promise((resolve,reject) =>{
resolve(store.get_races(body))
//console.log("menssage body desde get hive pay", body);
 })

}


module.exports = {
 get_race,
}


























