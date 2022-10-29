const {
    get_pays,
    check_pay,
} = require ('./compras/presale.js');


setInterval(displayHello, 10000);

async function displayHello() {
 console.log("NO JODAS")
 const pays_to_proccess= await get_pays()
 if(pays_to_proccess.length>=1){
  //console.log("pays_to_proccess in index", pays_to_proccess);
 await check_pay(pays_to_proccess)
 }

}


