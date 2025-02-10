const { getCofresForUser, get_wallet, set_wallet,updateCofres } = require("./store");







async function processCofre_especial(reqbody) {
  // console.log("reqbodyYYYYYYY", reqbody);

  const { user_claim, cofres } = reqbody.user_cofres;

   let wallet= await get_wallet({usuario:user_claim})//.then((wallt)=>
    // console.log("wallet", wallet);

if(wallet[0].status_cofres==="free"){
  console.log("cofres free, procede reclamo")

if(wallet[0].balance_cofre_e>=1){
  console.log("tiene cofre para claimear")


  let objeto= generarObjeto(1);
  console.log("objetoTOTOTOTOTOTOTOTOTO", objeto);
 


 const filtro = { usuario:user_claim };
 const actualizacion = { $set: { status_cofres: 'pending' } };


  
 await set_wallet(filtro,actualizacion);
 await updateCofres(user_claim,1,objeto)
 


return objeto

}else{console.log("NO tiene cofre para claimear")}



}else{console.log("cofres en espera");
throw new Error("Espera a que lleguen tus cofres reclamados");


respuesta={respuesta:"debes esperar"}
return respuesta
}

}







function randomBasico() {
  const rand = Math.random(); // Genera un número aleatorio entre 0 y 1
  console.log("random", rand);

  if (rand < 0.13) {
    return 1; // 13% de probabilidad
  } else if (rand < 0.23) {
    return 2; // 10% de probabilidad vote_c 15%
  } else if (rand < 0.36) {
    return 3; // 13% de probabilidad
  } else if (rand < 0.46) {
    return 4; // 10% de probabilidad
  } else if (rand < 0.52) {
    return 5; // 6% de probabilidad
  }else if (rand < 0.62) {
    return 6; // 10% de probabilidad
  } else if (rand < 0.66) {
    return 7; // 4% de probabilidad
  } else if (rand < 0.69) {
    return 8; // 2% de probabilidad
  } else if (rand < 0.71) {
    return 9; // 2% de probabilidad
  } else if (rand < 0.73) {
    return 10; // 2% de probabilidad
  }
  else if (rand < 0.75) {
    return 11; // 2% de probabilidad
  }else if (rand < 0.80) {
    return 12; // 5% de probabilidad
  }else if (rand < 0.85) {
    return 13; // 5% de probabilidad
  }else if (rand < 0.89) {
    return 14; // 4% de probabilidad
  }else if (rand < 0.92) {
    return 15; // 3% de probabilidad
  }else if (rand < 0.95) {
    return 16; // 3% de probabilidad
  }else if (rand < 0.96) {
    return 17; // 1% de probabilidad
  }else if (rand < 0.97) {
    return 18; // 1% de probabilidad
  }else if (rand < 0.98) {
    return 19; // 1% de probabilidad
  }else if (rand < 0.984) {
    return 20; // 0.4% de probabilidad
  }else if (rand < 0.986) {
    return 21; // 0.2% de probabilidad
  }else if (rand < 0.988) {
    return 22; // 0.2% de probabilidad
  }else if (rand < 0.99) {
    return 23; // 0.2% de probabilidad
  }else if (rand < 0.992) {
    return 24; // 0.2% de probabilidad
  }else if (rand < 0.993) {
    return 25; // 0.1% de probabilidad
  }else if (and < 0.994) {
    return 26; // 0.1% de probabilidad
  } else if (rand < 0.995) {
    return 27; // 0.1% de probabilidad
  }else if (rand < 0.9960) {
    return 28; // 0.1% de probabilidad
  } else if (rand < 0.9965) {
    return 29; // 0.05% de probabilidad
  }else if (rand < 0.9969) {
    return 30; // 0.04% de probabilidad
  } else if (rand < 0.9970) {
    return 31; // 0.01% de probabilidad
  }else if (rand < 0.9975) {
    return 32; // 0.05% de probabilidad
  } else if (rand < 0.9979) {
    return 33; // 0.04% de probabilidad
  }else if (rand < 0.9980) {
    return 34; // 0.01% de probabilidad
  } else if (rand < 0.9985) {
    return 35; // 0.05% de probabilidad
  }else if (rand < 0.9989) {
    return 36; // 0.04% de probabilidad
  } else if (rand < 0.9990) {
    return 37; // 0.01% de probabilidad
  }else if (rand < 0.9995) {
    return 38; // 0.05% de probabilidad
  } else if (rand < 0.9999) {
    return 39; // 0.04% de probabilidad
  }
  else {
 return 40;  
  }
}




function generarObjeto(num) {
  const objeto = {};
  let consultas = [];

  if (num === 1) {
    objeto[num] = randomBasico();
  } else if (num === 3) {
    consultas = [randomBasico, randomRaro, randomRaro];
    let contador = 1;
    for (let i = 0; i < 3; i++) {
      const rand = Math.random();
      const randomFunc = rand < 0.5 ? consultas[0] : consultas[1];
      objeto[contador] = randomFunc();
      contador++;
    }
  } else if (num === 5) {
    consultas = [randomBasico, randomRaro, randomEpico];
    let contador = 1;
    for (let i = 0; i < 5; i++) {
      const rand = Math.random();
      let randomFunc;
      if (rand < 0.3333) {
        randomFunc = consultas[0];
      } else if (rand < 0.6666) {
        randomFunc = consultas[1];
      } else {
        randomFunc = consultas[2];
      }
      if (randomFunc() === 1) {
        objeto[contador] = randomFunc();
      } else if (randomFunc() === 9) {
        objeto[contador] = 5;
      } else {
        objeto[contador] = randomFunc();
      }
      contador++;
    }
  }

  return objeto;
}



module.exports = {
  processCofre_especial,
};




