const store = require('./store.js');




async function get_wallets(body){
console.log("BODY DEJUSTP", body)
return new Promise((resolve,reject) =>{
resolve(store.get_wallet(body))

 })

}


module.exports = {
 get_wallets,
}
