const store = require('./store.js');




async function get_equino(body){
console.log("BODY get_equino", body)
return new Promise((resolve,reject) =>{
resolve(store.get_equino(body))

 })

}


async function post_equino(body){
console.log("BODY post_equino", body)

if(body.response.error){
    console.log("body.error post_equino", body.response.error);

    return body.response.error
}else{
      console.log("BODYpostequinoelse",body)
    
    if(body.response){

    console.log("BODYpostequinoelse",body)


    }

    


}
// return new Promise((resolve,reject) =>{
// resolve(store.get_equino(body))

//  })

}

module.exports = {
 get_equino,
 post_equino
}


























