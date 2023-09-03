const { getCofresForUser, get_wallet, set_wallet } = require("./store");







async function processCofre_especial(reqbody) {
  console.log("reqbodyYYYYYYY", reqbody);

  const { user_claim, cofres } = reqbody.user_cofres;

   let wallet= await get_wallet({usuario:user_claim})//.then((wallt)=>
    console.log("wallet", wallet);

if(wallet[0].status_cofres==="free"){
  console.log("cofres free, procede reclamo")

if(wallet[0].balance_cofre_e>=1){
  console.log("tiene cofre para claimear")


  let objeto= generarObjeto(1);
  console.log("objetoTOTOTOTOTOTOTOTOTO", objeto);
 


 const filtro = { usuario:user_claim };
 const actualizacion = { $set: { status_cofres: 'pending' } };


  
  await set_wallet(filtro,actualizacion);


return objeto

}else{console.log("NO tiene cofre para claimear")}



}else{console.log("cofres en espera");
//throw new Error("Espera a que lleguen tus cofres reclamados");

 const filtro = { usuario:user_claim };
 const actualizacion = { $set: { status_cofres: 'free' } };
 await set_wallet(filtro,actualizacion);

respuesta={respuesta:"debes esperar"}
 return respuesta
}

}


// {console.log("walletSERVER", wallt);
// }

//     )
  

//  let cofres_claim=parseInt(cofres)
//   //const userChests = await getCofresForUser(user_claim);

//   // if (userChests.status_m === "pending") {
//   //   throw new Error("Espera a que lleguen tus cofres reclamados");
//   // }

//   const llavesDisponibles = userChests.llaves_m_compradas - userChests.llaves_m_gastadas;
//   if (llavesDisponibles < cofres_claim) {
//     throw new Error("No tienes suficientes llaves para comprar los cofres solicitados");
//   }

//   const cofresDisponibles = userChests.cofres_m_compradas - userChests.cofres_m_gastadas;
//   if (cofresDisponibles < cofres_claim) {
//     throw new Error("No tienes suficientes cofres para procesar la solicitud");
//   }
  
//   let objeto= generarObjeto(cofres_claim);
//   console.log("objetoTOTOTOTOTOTOTOTOTO", objeto);

//   userChests.cofres_m_procesando += cofres;
//   userChests.status_m = "pending";
//   userChests.cofres_m_obtenidos= objeto;
// //  const updatedUserChests = await userChests.save();
  
//   return updatedUserChests;





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






// ahora debo formar un objeto, segun el numero recibido en una variable,
// si el numero recibido es 1, ese numero se tomara como clave y solo debe consultar una vez a la funcion  randomBasico
// la cual le regresa el numero que va como valor 



// si el numero recibido es 3,  el objeto final debe tener 3 valores 
// que se formaran de la siguiente forma, debe generar un numero ramdo 
// con 50% de posibilidades entre consultar a la funcion randomBasico o randomRaro
// si  la consuta es hecha a randomBasico entonces la clave sera 1 y el valor de esa clave
// sera el obtenido de consultar randomBasico, si la consulta es a randomRaro entonces la clave 
// sera 3 y el valor de esa clave sera el obtenido de consultar  randomRaro
// esto debe hacerlo 3 veces ya que el numero recibido desde un principio
// entonces el objeto final debe ser algo similar a : 

// [{1:7, 3:2 , 1:5}]    


// si el numero recibido es 5,  el objeto final debe tener 5 valores 
// que se formaran de la siguiente forma, debe generar un numero ramdo 
// con 33,3% de posibilidades entre consultar a la funcion randomBasico,randomRaro,randomBasicoEpico
// si  la consuta es hecha a randomBasico entonces la clave sera 1 y el valor de esa clave
// sera el obtenido de consultar randomBasico, si la consulta es a randomRaro entonces la clave 
// sera 3 y el valor de esa clave sera el obtenido de consultar  randomRaro
// esto debe hacerlo 3 veces ya que el numero recibido desde un principio
// si la consulta es a randomEpico entonces la clave 
// sera 5 y el valor de esa clave sera el obtenido de consultar  randomEpice
// esto debe hacerlo 5 veces ya que es el numero recibido desde un principio

// entonces el objeto final debe ser algo similar a : 

// [{1:7, 3:2 , 1:5, 5:3 ,5:1}]