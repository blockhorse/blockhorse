const { getCofresForUser } = require("./store");

async function processCofre(reqbody) {
  console.log("reqbodyYYYYYYY", reqbody);

  const { user_claim, cofres } = reqbody.user_cofres;

 let cofres_claim=parseInt(cofres)
  const userChests = await getCofresForUser(user_claim);

  if (userChests.status_m === "pending") {
    throw new Error("Espera a que lleguen tus cofres reclamados");
  }

  const llavesDisponibles = userChests.llaves_m_compradas - userChests.llaves_m_gastadas;
  if (llavesDisponibles < cofres_claim) {
    throw new Error("No tienes suficientes llaves para comprar los cofres solicitados");
  }

  const cofresDisponibles = userChests.cofres_m_compradas - userChests.cofres_m_gastadas;
  if (cofresDisponibles < cofres_claim) {
    throw new Error("No tienes suficientes cofres para procesar la solicitud");
  }
  
  let objeto= generarObjeto(cofres_claim);
  console.log("objetoTOTOTOTOTOTOTOTOTO", objeto);

  userChests.cofres_m_procesando += cofres;
  userChests.status_m = "pending";
  userChests.cofres_m_obtenidos= objeto;
  const updatedUserChests = await userChests.save();
  
  return updatedUserChests;
}




function randomBasico() {
  const rand = Math.random(); // Genera un número aleatorio entre 0 y 1
  console.log("random", rand);

  if (rand < 0.10) {
    return 1; // 10% de probabilidad
  } else if (rand < 0.18) {
    return 2; // 8% de probabilidad
  } else if (rand < 0.28) {
    return 3; // 10% de probabilidad
  } else if (rand < 0.36) {
    return 4; // 8% de probabilidad
  } else if (rand < 0.48) {
    return 5; // 12% de probabilidad
  }else if (rand < 0.58) {
    return 6; // 10% de probabilidad
  }else if (rand < 0.70) {
    return 7; // 12% de probabilidad
  }else if (rand < 0.80) {
    return 8; // 10% de probabilidad
  }else if (rand < 0.85) {
    return 9; // 5% de probabilidad
  }else if (rand < 0.88) {
    return 10; // 3% de probabilidad
  }else if (rand < 0.91) {
    return 11; // 3% de probabilidad
  }else if (rand < 0.935) {
    return 12; // 2.5% de probabilidad
  }else if (rand < 0.95) {
    return 13; // 2.5% de probabilidad
  }else if (rand < 0.96) {
    return 14; // 1% de probabilidad
  }else if (rand < 0.98) {
    return 15; // 2% de probabilidad
  }else if (rand < 0.99) {
    return 16; // 1% de probabilidad
  }else if (rand < 0.9935) {
    return 17; // 0.35% de probabilidad
  }else if (rand < 0.9960) {
    return 18; // 0.25% de probabilidad
  }else if (rand < 0.9990) {
    return 19; // 0.30% de probabilidad
  } else {
    const newRand = Math.floor(Math.random() * 8) + 10; // Genera un número aleatorio entre 10 y 25
    return newRand; // 0.1% de probabilidad
  }
}




function randomRaro() {
  const rand = Math.random(); // Genera un número aleatorio entre 0 y 1
  if (rand < 0.08) {
    return 1; // 8% de probabilidad
  } else if (rand < 0.15) {
    return 2; // 7% de probabilidad
  } else if (rand < 0.23) {
    return 3; // 8% de probabilidad
  } else if (rand < 0.30) {
    return 4; // 7% de probabilidad
  } else if (rand < 0.38) {
    return 5; // 8% de probabilidad
  }else if (rand < 0.48) {
    return 6; // 10% de probabilidad
  }else if (rand < 0.58) {
    return 7; // 10% de probabilidad
  }else if (rand < 0.68) {
    return 8; // 10% de probabilidad
  }else if (rand < 0.75) {
    return 9; //  7% de probabilidad
  }else if (rand < 0.80) {
    return 10; // 5% de probabilidad
  }else if (rand < 0.84) {
    return 11; // 4% de probabilidad
  }else if (rand < 0.88) {
    return 12; // 4% de probabilidad
  }else if (rand < 0.92) {
    return 13; // 4% de probabilidad
  }else if (rand < 0.94) {
    return 14; // 2% de probabilidad
  }else if (rand < 0.96) {
    return 15; // 2% de probabilidad
  }else if (rand < 0.97) {
    return 16; // 1% de probabilidad
  }else if (rand < 0.98) {
    return 17; // 1% de probabilidad
  }else if (rand < 0.99) {
    return 18; // 1% de probabilidad
  }else if (rand < 0.9990) {
    return 19; // 0.9% de probabilidad
  } else {
    const newRand = Math.floor(Math.random() * 8) + 10; // Genera un número aleatorio entre 10 y 25
    return newRand; // 5% de probabilidad
  }
}



function randomEpico() {
  const rand = Math.random(); // Genera un número aleatorio entre 0 y 1

    if (rand < 0.05) {
    return 1; // 5% de probabilidad
  } else if (rand < 0.12) {
    return 2; // 7% de probabilidad
  } else if (rand < 0.20) {
    return 3; // 8% de probabilidad
  } else if (rand < 0.27) {
    return 4; // 7% de probabilidad
  } else if (rand < 0.37) {
    return 5; // 10% de probabilidad
  }else if (rand < 0.48) {
    return 6; // 10% de probabilidad
  }else if (rand < 0.58) {
    return 7; // 10% de probabilidad
  }else if (rand < 0.68) {
    return 8; // 10% de probabilidad
  }else if (rand < 0.75) {
    return 9; //  7% de probabilidad
  }else if (rand < 0.80) {
    return 10; // 5% de probabilidad
  }else if (rand < 0.84) {
    return 11; // 4% de probabilidad
  }else if (rand < 0.88) {
    return 12; // 4% de probabilidad
  }else if (rand < 0.92) {
    return 13; // 4% de probabilidad
  }else if (rand < 0.94) {
    return 14; // 2% de probabilidad
  }else if (rand < 0.96) {
    return 15; // 2% de probabilidad
  }else if (rand < 0.97) {
    return 16; // 1% de probabilidad
  }else if (rand < 0.98) {
    return 17; // 1% de probabilidad
  }else if (rand < 0.99) {
    return 18; // 1% de probabilidad
  }else if (rand < 0.9990) {
    return 19; // 0.9% de probabilidad
  } else {
    const newRand = Math.floor(Math.random() * 8) + 10; // Genera un número aleatorio entre 10 y 25
    return newRand; // 5% de probabilidad
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
  processCofre,
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