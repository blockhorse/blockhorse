const store = require('./store.js');


async function find_user(user){
const {referred,username}=user
console.log("referred,username", referred,username);

if(referred.length< 1){
return new Promise((resolve, reject)=> {
resolve(store.get_user({usuario: username}))

})

} else{
  console.log("NO esta el referido")

 const busqueda= await store.get_user({usuario:username})
 console.log("busqueda de user", busqueda);

 if(busqueda.length>2){
console.log("se prendio busqueda")
 }else{
return new Promise((resolve, reject)=> {
resolve(store.set_user({usuario: username,referente:referred}))

})
}

}
}


module.exports = {

	find_user,
}