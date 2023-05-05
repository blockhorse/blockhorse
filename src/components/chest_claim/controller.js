const { getCofresForUser } = require("./store");

async function processCofre(reqbody) {
  console.log("reqbodyYYYYYYY", reqbody);

  const { user_claim, cofres } = reqbody.user_cofres;

  const userChests = await getCofresForUser(user_claim);

  if (userChests.status === "pending") {
    throw new Error("Espera a que lleguen tus cofres reclamados");
  }

  const llavesDisponibles = userChests.llaves_compradas - userChests.llaves_gastadas;
  if (llavesDisponibles < cofres) {
    throw new Error("No tienes suficientes llaves para comprar los cofres solicitados");
  }

  const cofresDisponibles = userChests.cofres_compradas - userChests.cofres_gastadas;
  if (cofresDisponibles < cofres) {
    throw new Error("No tienes suficientes cofres para procesar la solicitud");
  }

  userChests.cofres_procesando += cofres;
  userChests.status = "pending";
  const updatedUserChests = await userChests.save();
  
  return updatedUserChests;
}




function randomBasico() {
  const rand = Math.random(); // Genera un número aleatorio entre 0 y 1

  if (rand < 0.5) {
    return 1; // 50% de probabilidad
  } else if (rand < 0.65) {
    return 2; // 15% de probabilidad
  } else if (rand < 0.75) {
    return 3; // 10% de probabilidad
  } else if (rand < 0.85) {
    return 4; // 10% de probabilidad
  } else if (rand < 0.95) {
    return 5; // 10% de probabilidad
  } else {
    const newRand = Math.floor(Math.random() * 16) + 10; // Genera un número aleatorio entre 10 y 25
    return newRand; // 5% de probabilidad
  }
}



function randomRaro() {
  const rand = Math.random(); // Genera un número aleatorio entre 0 y 1

  if (rand < 0.4) {
    return 1; // 40% de probabilidad
  } else if (rand < 0.55) {
    return 2; // 15% de probabilidad
  } else if (rand < 0.65) {
    return 3; // 10% de probabilidad
  } else if (rand < 0.75) {
    return 4; // 10% de probabilidad
  } else if (rand < 0.85) {
    return 5; // 10% de probabilidad
  } else if (rand < 0.9) {
    return 6; // 5% de probabilidad
  } else if (rand < 0.95) {
    return 8; // 5% de probabilidad
  } else {
   const newRand = Math.floor(Math.random() * 16) + 10; // Genera un número aleatorio entre 10 y 25
    return newRand; // 5% de probabilidad
  }
}



function randomEpico() {
  const rand = Math.random(); // Genera un número aleatorio entre 0 y 1

  if (rand < 0.4) {
    return 1; // 40% de probabilidad
  } else if (rand < 0.5) {
    return 2; // 10% de probabilidad
  } else if (rand < 0.6) {
    return 3; // 10% de probabilidad
  } else if (rand < 0.7) {
    return 4; // 10% de probabilidad
  } else if (rand < 0.8) {
    return 5; // 10% de probabilidad
  } else if (rand < 0.85) {
    return 6; // 5% de probabilidad
  } else if (rand < 0.9) {
    return 7; // 5% de probabilidad
  } else if (rand < 0.95) {
    return 8; // 5% de probabilidad
  } else {
    const newRand = Math.floor(Math.random() * 16) + 10; // Genera un número aleatorio entre 10 y 25
    return newRand; // 5% de probabilidad
  }
}



function generarObjeto(num) {
  const objeto = {};
  
  if (num === 1) {
    objeto[num] = randomBasico();
    return objeto;
  }
  
  for (let i = 0; i < 3; i++) {
    const rand = Math.random();
    if (rand < 0.5) {
      objeto[i === 0 ? num : 1] = randomBasico();
    } else {
      objeto[num] = randomRaro();
    }
  }

  return objeto;
}




function generarObjeto(num) {
  const objeto = {};
  let consultas = [];

  if (num === 1) {
    objeto[num] = randomBasico();
  } else if (num === 3) {
    consultas = [randomBasico, randomRaro, randomRaro];
    for (let i = 0; i < 3; i++) {
      const rand = Math.random();
      const randomFunc = rand < 0.5 ? consultas[0] : consultas[1];
      objeto[randomFunc() ? 1 : 3] = randomFunc();
    }
  } else if (num === 5) {
    consultas = [randomBasico, randomRaro, randomBasicoEpico];
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
      objeto[randomFunc() === 1 ? 1 : randomFunc() === 9 ? 5 : 3] = randomFunc();
    }
  }

  return [objeto];
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