async function findAvatar_block(id_avatar){
return new Promise((resolve, reject)=> {
  const menssage={
  	user: "Pahive nene",
  	avatar: id_avatar,
  	date: new Date(),
  };

console.log("menssage", menssage);

})

}


module.exports = {
 findAvatar_block,
}