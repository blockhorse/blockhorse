const { getCofresForUser, get_wallet, set_wallet,updateCofres } = require("./store");







async function processCofre_especial(reqbody) {
  // console.log("reqbodyYYYYYYY", reqbody);
let cofre_en_reclamo={};
  const { user_claim, cofres } = reqbody.user_cofres;

   let wallet= await get_wallet({usuario:user_claim})//.then((wallt)=>
    // console.log("wallet", wallet);



if(wallet[0].balance_cofre_e >= 1){
  console.log("tiene cofre para claimear")


  let objeto= generarObjeto(1);
 await updateCofres(user_claim,1,objeto)

 cofre_en_reclamo[1]=objeto

const filtro = { usuario:user_claim };
const actualizacion = {
  $inc: { retirados_cofres_especiales: 1 , balance_cofre_e: -1 }
};
await set_wallet(filtro,actualizacion);
 


return cofre_en_reclamo

}else{

let respuesta="You have no chest to claim";
return respuesta
  console.log("NO tiene cofre para claimear")}





}








function randomBasico() {
  const rand = Math.random(); // Genera un número aleatorio entre 0 y 1
  console.log("random", rand);

  if (rand < 0.23) {
    return 1; // 23% de probabilidad
  } else if (rand < 0.46) {
    return 2; // 23% de probabilidad
  } else if (rand < 0.69) {
    return 3; // 10% de probabilidad
  } else if (rand < 0.71) {
    return 4; // 2% de probabilidad
  } else if (rand < 0.73) {
    return 5; // 2% de probabilidad
  }else if (rand < 0.75) {
    return 6; // 2% de probabilidad
  }else if (rand < 0.80) {
    return 7; // 5% de probabilidad
  }else if (rand < 0.85) {
    return 8; // 5% de probabilidad
  }else if (rand < 0.89) {
    return 9; // 4% de probabilidad
  }else if (rand < 0.92) {
    return 10; // 3% de probabilidad
  }else if (rand < 0.95) {
    return 11; // 3% de probabilidad
  }else if (rand < 0.96) {
    return 12; // 1% de probabilidad
  }else if (rand < 0.97) {
    return 13; // 1% de probabilidad
  }else if (rand < 0.98) {
    return 14; // 1% de probabilidad
  }else if (rand < 0.984) {
    return 15; // 0.4% de probabilidad
  }else if (rand < 0.986) {
    return 16; // 0.2% de probabilidad
  }else if (rand < 0.988) {
    return 17; // 0.2% de probabilidad
  }else if (rand < 0.99) {
    return 18; // 0.2% de probabilidad
  }else if (rand < 0.992) {
    return 19; // 0.2% de probabilidad
  }else if (rand < 0.993) {
    return 20; // 0.1% de probabilidad
  }else if (rand < 0.994) {
    return 21; // 0.1% de probabilidad
  } else if (rand < 0.995) {
    return 22; // 0.1% de probabilidad
  }else if (rand < 0.9960) {
    return 23; // 0.1% de probabilidad
  } else if (rand < 0.9965) {
    return 24; // 0.05% de probabilidad
  }else if (rand < 0.9969) {
    return 25; // 0.04% de probabilidad
  } else if (rand < 0.9970) {
    return 26; // 0.01% de probabilidad
  }else if (rand < 0.9975) {
    return 27; // 0.05% de probabilidad
  } else if (rand < 0.9979) {
    return 28; // 0.04% de probabilidad
  }else if (rand < 0.9980) {
    return 29; // 0.01% de probabilidad
  } else if (rand < 0.9985) {
    return 30; // 0.05% de probabilidad
  }else if (rand < 0.9989) {
    return 31; // 0.04% de probabilidad
  } else if (rand < 0.9990) {
    return 32; // 0.01% de probabilidad
  }else if (rand < 0.9995) {
    return 33; // 0.05% de probabilidad
  } else if (rand < 0.9999) {
    return 34; // 0.04% de probabilidad
  }
  else {
 return 35;  
  }
}




function generarObjeto(num) {
  let objeto = 0;

  if (num === 1) {
    objeto = randomBasico();
  }  

  return objeto;
}



module.exports = {
  processCofre_especial,
};




