const store = require('./store.js');




async function get_equino(body){
console.log("BODY DEJUSTP", body)
return new Promise((resolve,reject) =>{
resolve(store.get_equino(body))

 })

}


module.exports = {
 get_equino,
}


























