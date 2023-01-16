const store = require('./store.js');




async function get_time(){

return new Promise((resolve,reject) =>{
resolve(store.get_time({id:"0"}))
//console.log("menssage body desde get hive pay", body);
 })

}


module.exports = {
 get_time,
}















