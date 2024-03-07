require("dotenv").config();
const Model= require('./models.js')
const ModelEquino= require('./../equino/models.js')
const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
console.log("conexion_db");



// Obtener el número de conexiones abiertas
const numConnections = db.connections.length;

console.log(`Número de conexiones abiertas: ${numConnections}`);


async function entrenarGratis(notification) {
   const Notificaton = new Model(notification)
   console.log("Notificaton", Notificaton);
       await Notificaton.save().catch((e)=>{
            console.log(e)
           
        });

}





async function entrenarGratis_speed(data) {
  const { equineId, speed,trx_nft } = data;
  
  try {
    // Busca el documento correspondiente usando equineId
    let existingEntrenamiento = await Model.findOne({ equineId });

    if (!existingEntrenamiento) {
      // Si no existe, crea un nuevo documento con equineId y el primer valor de velocidad
      existingEntrenamiento = new Model({
        equineId,
        speed: [speed],
        trx_nft:[trx_nft],
         // Agrega el primer valor de velocidad al array
      });
    } else {
      // Si existe, agrega el nuevo valor al array speed
      existingEntrenamiento.speed.push(speed);
      existingEntrenamiento.trx_nft.push(trx_nft);
      existingEntrenamiento.entrenamiento_gratis = 2;
    }

    // Guarda el documento
    await existingEntrenamiento.save();
    
    console.log("Entrenamiento actualizado:", existingEntrenamiento);
  } catch (error) {
    console.error("Error al entrenar gratis:", error);
  }
}



async function Registrar_speed(data) {
  const { equineId, speed ,trx_nft} = data;
  
  try {
    // Busca el documento correspondiente usando equineId
    let existingEntrenamiento = await ModelEquino.findOne({ equineId });

    if (!existingEntrenamiento) {
     console.log("No Existe ese equino")
    } else {

      const currentVelocidadAdd = Number(existingEntrenamiento.velocidad_add) || 0;
      
      const updatedValue = (currentVelocidadAdd + Number(speed)).toFixed(5).toString();
      let ultimoEntrenamiento = { habilidad: "speed", puntosAnteriores: currentVelocidadAdd, nuevosPuntos: updatedValue, trx_id:"gratis" };
     
      existingEntrenamiento.lastTrain=ultimoEntrenamiento;
      existingEntrenamiento.velocidad_add = updatedValue;
      existingEntrenamiento.trx_nft = trx_nft;
      existingEntrenamiento.entrenamiento_gratis = 2;
    }



 

    // Guarda el documento
    await existingEntrenamiento.save();
    
    console.log("Entrenamiento actualizado:", existingEntrenamiento);
  } catch (error) {
    console.error("Error al entrenar gratis:", error);
  }
}


async function entrenarGratis_endurance(data) {
  const { equineId, endurance , trx_nft } = data;
  
  try {
    // Busca el documento correspondiente usando equineId
    let existingEntrenamiento = await Model.findOne({ equineId });

    if (!existingEntrenamiento) {
      // Si no existe, crea un nuevo documento con equineId y el primer valor de velocidad
      existingEntrenamiento = new Model({
        equineId,
        endurance: [endurance], // Agrega el primer valor de velocidad al array
        trx_nft:[trx_nft]
      });
    } else {
      // Si existe, agrega el nuevo valor al array speed
       existingEntrenamiento.endurance.push(endurance);
       existingEntrenamiento.trx_nft.push(trx_nft);
       existingEntrenamiento.entrenamiento_gratis = 2;
    }

    // Guarda el documento
    await existingEntrenamiento.save();
    
    console.log("Entrenamiento actualizado:", existingEntrenamiento);
  } catch (error) {
    console.error("Error al entrenar gratis:", error);
  }
}


async function Registrar_endurance(data) {
  const { equineId, endurance, trx_nft } = data;
  
  try {
    // Busca el documento correspondiente usando equineId
    let existingEntrenamiento = await ModelEquino.findOne({ equineId });

    if (!existingEntrenamiento) {
     console.log("No Existe ese equino")
    } else {
      // Si existe, agrega el nuevo valor al array speed
      const currentResistenciaAdd = Number(existingEntrenamiento.resistencia_add) || 0;
      
     // const updatedValue = (currentResistenciaAdd + Number(endurance)).toString();
      const updatedValue = (currentResistenciaAdd + Number(endurance)).toFixed(5).toString();

      existingEntrenamiento.resistencia_add = updatedValue;
      existingEntrenamiento.entrenamiento_gratis = 2;
       existingEntrenamiento.trx_nft = trx_nft;
    }



 

    // Guarda el documento
    await existingEntrenamiento.save();
    
    console.log("Entrenamiento actualizado:", existingEntrenamiento);
  } catch (error) {
    console.error("Error al entrenar gratis:", error);
  }
}






async function get_equino(equino) {
  let equineIds;

  if (equino.equineId.includes(',')) {
    equineIds = equino.equineId.split(',').map(Number);
  } else {
    equineIds = [Number(equino.equineId)];
  }

  console.log("ME ejecuto desde store get equino", equineIds);
  const equinos = await ModelEquino.find({ equineId: { $in: equineIds } }).catch(e => {
    console.log("error");
    console.log(e);
  });
  // console.log("EQU", equinos);
  return equinos;
}






// async function Activar_Entrenamiento(data) {
//   const { equineId,trx_nft} = data;
  
//   try {
//     // Busca el documento correspondiente usando equineId
//     let existingEntrenamiento = await ModelEquino.findOne({ equineId });

//     if (!existingEntrenamiento) {
//      console.log("No Existe ese equino")
//      return
//     } else {

//       if(existingEntrenamiento.entrenamiento_gratis===0){
//       existingEntrenamiento.trx_nft = trx_nft;
//       existingEntrenamiento.entrenamiento_gratis = 5;
   

//       }

//     }



 

//     // Guarda el documento
//     await existingEntrenamiento.save();
    
//     console.log("Entrenamiento actualizado:", existingEntrenamiento);
//   } catch (error) {
//     console.error("Error al entrenar gratis:", error);
//   }
// }


async function Activar_Entrenamiento(data) {
  const { equineId, trx } = data;
  
  try {
    // Busca el documento correspondiente usando equineId
    let existingEntrenamiento = await ModelEquino.findOne({ equineId });

    if (!existingEntrenamiento) {
      console.log("No existe el equino.");
      return;
    }

    // Inicializa trx_nft como un array si es nulo o indefinido
    if (!existingEntrenamiento.trx_entrenmientos) {
      existingEntrenamiento.trx_entrenmientos = [];
    }

    // Agrega la nueva transacción al array trx_nft
    existingEntrenamiento.trx_entrenmientos.push({ trx, fecha: new Date() });

      existingEntrenamiento.entrenamiento_gratis=5;

    // Guarda el documento actualizado
    await existingEntrenamiento.save();
    
    console.log("Entrenamiento actualizado:", existingEntrenamiento);
  } catch (error) {
    console.error("Error al entrenar:", error);
  }
}

module.exports = {
entrenarGratis_speed, 
entrenarGratis_endurance,
Registrar_speed,
Registrar_endurance,
get_equino,
Activar_Entrenamiento
}


 