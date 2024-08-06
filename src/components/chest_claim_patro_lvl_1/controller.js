const { updateCofres, getCofresForUser } = require("./store");

async function processCofre(reqbody) {
  console.log("reqbodyYYYYYYY", reqbody);

  const { user_claim, cofres_patro } = reqbody;

 let cofres_claim=parseInt(cofres_patro)
  const userChests = await getCofresForUser(user_claim);

  if (userChests.status_patro === "pending") {
    throw new Error("Espera a que lleguen tus cofres reclamados");
  }

  const cofresDisponibles = userChests.cofres_patro_comprados - userChests.cofres_patro_gastados;
  if (cofresDisponibles < cofres_claim) {
    throw new Error("You don't have enough chests to process the request");
  }
  
  let objeto= generarObjeto(cofres_claim);
  console.log("objetoTOTOTOTOTOTOTOTOTO", objeto);

  userChests.cofres_patro_procesando += cofres_claim;
  userChests.status_patro = "pending";
  userChests.cofres_patro_obtenido= objeto;
  const updatedUserChests = await userChests.save();
  
  return updatedUserChests;
  
}





function randomBasico() {
  const rand = Math.random(); // Genera un número aleatorio entre 0 y 1
  console.log("random", rand);

  if (rand < 0.05) {
    return 1; // 5% de probabilidad   cofre especial
  } else if (rand < 0.08) {
    return 2; // 3% de probabilidad  cofre especial  
  } else if (rand < 0.10) {
    return 3; // 2% de probabilidad   cofre especial
  } else if (rand < 0.13) {
    return 4; // 3% de probabilidad  silla
  } else if (rand < 0.15) {
    return 5; // 2% de probabilidad  2 silla 
  }else if (rand < 0.18) {
    return 6; // 3% de probabilidad  desparasitantes 2
  }else if (rand < 0.19) {
    return 7; // 1% de probabilidad desparasitantes 4
  }else if (rand < 0.21) {
    return 8; // 2% de probabilidad    vitaminas
  }else if (rand < 0.23) { 
    return 9; // 2% de probabilidad    visita   medica
  }else if (rand < 0.24) {
    return 10; // 1% de probabilidad  2  visita medica
  }else if (rand < 0.25) {
    return 11; // 1% de probabilidad  resurrecion
  }else if (rand < 0.30) {
    return 12; // 5% de probabilidad  BHR  0.10
  }else if (rand < 0.33) {
    return 13; // 3% de probabilidad  BHR 0.25
  }else if (rand < 0.35) {
    return 14; // 2% de probabilidad    BHR  0.50  
  }else if (rand < 0.36) {
    return 15; // 1% de probabilidad   BHR   1.00
  }else if (rand < 0.39) {
    return 16; // 3% de probabilidad  50 tickets
  }else if (rand < 0.41) {
    return 17; // 2% de probabilidad 100 tickets
  }else if (rand < 0.42) {
    return 18; // 1% de probabilidad  200 tickets
  }else if (rand < 0.44) {
    return 19; // 2% de probabilidad 1 pila
  }else if (rand < 0.45) {
    return 20; // 1% de probabilidad    2 pias 
  }else if (rand < 0.47) { 
    return 21; // 2% de probabilidad    magia 
  }else if (rand < 0.48) {
    return 22; // 1% de probabilidad   doped
  }else if (rand < 0.51) {
    return 23; // 3% de probabilidad    1kry magic
  }else if (rand < 0.53) {
    return 24; // 2% de probabilidad  3kry magic   
  }else if (rand < 0.54) {
    return 25; // 1% de probabilidad  5kry magic
  }else if (rand < 0.57) {
    return 26; // 3% de probabilidad  1cofre magico
  }else if (rand < 0.59) {
    return 27; // 2% de probabilidad   3cofre magico
  }else if (rand < 0.61) {
    return 28; // 2% de probabilidad  5cofre magico
  }else if (rand < 0.64) {
    return 29; // 3% de probabilidad   1 llave de cofre
  }else if (rand < 0.66) {
    return 30; // 2% de probabilidad  2 llave de cofre
  }else if (rand < 0.67) {
    return 31; //  1% de probabilidad 5 llaves de cofre
   }else if (rand < 0.70) {
    return 32; // 3% de probabilidad   1cofres     
  }else if (rand < 0.72) { 
    return 33; // 2% de probabilidad    3cofres 
  }else if (rand < 0.73) {
    return 34; // 1% de probabilidad   5cofres
  }else if (rand < 0.76) {
    return 35; // 3% de probabilidad    nO NFT COMUN
  }else if (rand < 0.79) {
    return 36; // 3% de probabilidad  nO NFT  nO COMUN   
  }else if (rand < 0.82) {
    return 37; // 3% de probabilidad  nO NFT rARO
  }else if (rand < 0.85) {
    return 38; // 3% de probabilidad    nO NFT ESPECTRAL 
  }else if (rand < 0.88) {
    return 39; // 3% de probabilidad   nO NFT EPICO
  }else if (rand < 0.91) {
    return 40; // 3% de probabilidad  nO NFT mITICO
  }else if (rand < 0.94) {
    return 41; // 3% de probabilidad  nO NFT LEGEN
  }else if (rand < 0.95) {
    return 42; // 1% de probabilidad   cRIA COMUN
  }else if (rand < 0.96) {
    return 43; // 1% de probabilidad CRIA NO COMUN
  }else if (rand < 0.97) {
    return 44; // 1% de probabilidad  CRIA RARA
  }else if (rand < 0.98) { 
    return 45; // 1% de probabilidad cRIA ESPECTRAL
  }else if (rand < 0.99) {
    return 46; // 1% de probabilidad  CRIA  ePICA
  }else if (rand < 0.995) {
    return 47; // 0.5% de probabilidad   CRIA  mITICA
  }else if (rand < 0.9999) {
    return 48; // 0% de probabilidad  CRIA  lEGENDARIO   
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

