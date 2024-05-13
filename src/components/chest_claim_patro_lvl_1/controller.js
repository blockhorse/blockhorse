const { getCofresForUser } = require("./store");

async function processCofre(reqbody) {
  console.log("reqbodyYYYYYYY", reqbody);

  const { user_claim, cofres } = reqbody.user_cofres;

 let cofres_claim=parseInt(cofres)
  const userChests = await getCofresForUser(user_claim);

  if (userChests.status_patro === "pending") {
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
    return 1; // 10% de probabilidad  No Nft Comun
  } else if (rand < 0.07) {
    return 2; // 7% de probabilidad   No Nft Un Comun 
  } else if (rand < 0.12) {
    return 3; // 5% de probabilidad   No Nft Rare
  } else if (rand < 0.16) {
    return 4; // c4% de probabilidad No Nft Spectral
  } else if (rand < 0.19) {
    return 5; // 3% de probabilidad No Nft Epic
  }else if (rand < 0.21) {
    return 6; // 2% de probabilidad No Nft Mithyc
  }else if (rand < 0.23) {
    return 7; // 2% de probabilidad No Nft  Legen
  }else if (rand < 0.30) {
    return 8; // 7% de probabilidad     tres  curas de  3
  }else if (rand < 0.35) { 
    return 9; // 5% de probabilidad    tres curas de 5 
  }else if (rand < 0.38) {
    return 10; // 3% de probabilidad   tres curas de 10
  }else if (rand < 0.40) {
    return 11; // 2% de probabilidad    2 curas de 30
  }else if (rand < 0.50) {
    return 12; // 10% de probabilidad  Implemento   
  }else if (rand < 0.60) {
    return 13; // 10% de probabilidad  1 hive de apuesta
  }else if (rand < 0.65) {
    return 14; // 5% de probabilidad    3 Hive de Apuesta 
  }else if (rand < 0.67) {
    return 15; // 2% de probabilidad   5Hive de Apuestas
  }else if (rand < 0.68) {
    return 16; // 1% de probabilidad  0.50 Hive de apuestas
  }else if (rand < 0.9935) {
    return 17; // 0.35% de probabilidad
  }else if (rand < 0.9960) {
    return 18; // 0.25% de probabilidad
  }else if (rand < 0.97) {
    return 19; // 0.30% de probabilidad
  } else {
    const newRand = randomCrianza() // Genera un número aleatorio entre 10 y 25
    return newRand; // 0.1% de probabilidad
  }
}







function randomCrianza() {
  const rand = Math.random(); // Genera un número aleatorio entre 0 y 1

    if (rand < 0.50) {
    return 20; // 50% de probabilidad comun
  } else if (rand < 0.65) {
    return 21; // 15% de probabilidad poco
  } else if (rand < 0.75) {
    return 22; // 10% de probabilidad raro
  } else if (rand < 0.83) {
    return 23; // 8% de probabilidad spectral
  } else if (rand < 0.90) {
    return 24; // 7% de probabilidad epico
  }else if (rand < 0.96) {
    return 25; // 6% de probabilidad mitico
  } else {
    return 26; // 4% de probabilidad legendario
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

