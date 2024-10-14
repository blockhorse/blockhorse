require("dotenv").config();
const walletsModel= require('./../wallet/models.js')
const equinoModel= require('./../equino/models.js')

const cajesModel= require('./../claim_ganancia/models.js')

const Model=require('./models.js')

const MONGOUSE = process.env.MONGOUSE
URI_MD = `mongodb://${MONGOUSE}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`
const db = require('mongoose');
db.Promise = global.Promise;
db.connect(URI_MD, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
console.log("conexion_db");




async function get_wallet(usuario) {
console.log("ME ejecuto desde store get wallet Claim Balance", usuario);
const claim = await walletsModel.find(usuario).catch(e => {
console.log("error");
console.log(e);
  });
  console.log("Claimed?", claim);
  return claim;
}




async function get_torneo(data) {
console.log("ME ejecuto desde store registrar en Torneo", data);
const claim = await Model.find(data).catch(e => {
console.log("error");
console.log(e);
  });
  console.log("Claimed?", claim);
  return claim;
}



async function get_equino(data) {
console.log("ME ejecuto desde store registrar en Torneo", data);
const claim = await equinoModel.find(data).catch(e => {
console.log("error");
console.log(e);
  });
  console.log("Claimed?", claim);
  return claim;
}





















async function register_canje(data) {
  console.log("data) desde registar canje", data);
  try {
    // Aquí se asume que "data" contiene un objeto con la información del reclamo
    const { usuario,articulo,balance_real,balance_restante,canje_costo,symbol} = data;

    // Crear una instancia del modelo o esquema "claim_consuelo"
    const nuevoRegistro = new cajesModel({
      usuario: usuario,
      balance_real: balance_real,
      balance_restante: balance_restante,
      reclamo: articulo,
      valor: canje_costo,
      symbol: symbol,
      entregado: true, // Puedes ajustar este valor según corresponda
      status_claim: "Done", // Puedes ajustar este valor según corresponda
      error: "Sin errores", // Puedes ajustar este valor según corresponda
      dia_drop: new Date(), // Esto establece la fecha actual
    });

    // Guardar el nuevo registro en la base de datos
    const registroGuardado = await nuevoRegistro.save();

    // console.log("Registro guardado con éxito:", registroGuardado);
     return true;
  } catch (error) {
    console.error("Error al guardar el registro:", error);
    throw error;
  }
}



async function register_torneo(data) {
    console.log("data desde registrar en torneo", data);
    try {
        const { id_Torneo, registro, inscripcion_costo, symbol } = data;

        // Inicializa un objeto para guardar el incremento en el pool total
        let poolUpdate = {};

        // Determina a qué pool se debe sumar el costo
        if (symbol === 'BHRT') {
            poolUpdate.pool_total_1 = inscripcion_costo; // Asignar costo para BHRT
        } else if (symbol === 'BHR') {
            poolUpdate.pool_total_2 = inscripcion_costo; // Asignar costo para BHR
        } else if (symbol === 'SWAP.HIVE') {
            poolUpdate.pool_total_3 = inscripcion_costo; // Asignar costo para SWAP.HIVE
        }

        // Encuentra el torneo existente y actualiza los registros y el pool total
        const torneoExistente = await Model.findOne({ id_Torneo });

        if (torneoExistente) {
            // Agregar el nuevo registro al array de registros
            torneoExistente.Registrados.push(registro);

            // Sumar el costo al pool total correspondiente
          torneoExistente.pool_total_1 += Number(poolUpdate.pool_total_1) || 0;
          torneoExistente.pool_total_2 += Number(poolUpdate.pool_total_2) || 0;
          torneoExistente.pool_total_3 += Number(poolUpdate.pool_total_3) || 0;


            // Guardar los cambios en la base de datos
            await torneoExistente.save();
            return true; // Devuelve true si el registro fue guardado exitosamente
        } else {
            // Si no existe el torneo, crea uno nuevo
            const torneos_registro = new Model({
                id_Torneo: id_Torneo,
                Registrados: [registro], // Crear el array con el nuevo registro
                pool_total_1: poolUpdate.pool_total_1 || 0,
                pool_total_2: poolUpdate.pool_total_2 || 0,
                pool_total_3: poolUpdate.pool_total_3 || 0
            });

            await torneos_registro.save();
            return true; // Devuelve true si el registro fue guardado exitosamente
        }
    } catch (error) {
        console.error("Error al guardar el registro:", error);
        throw error; // Lanza el error para que pueda ser manejado por el controlador
    }
}



async function register_equino_torneo(body) {
  console.log("data) desde register equino", body);
  try {
    // Aquí se asume que "data" contiene un objeto con la información necesaria
    const { equineId, usuario } = body;

    // Actualiza o crea un nuevo registro si no existe
    const registroActualizado = await equinoModel.findOneAndUpdate(
      { equineId: equineId }, // Filtro para encontrar el documento por equineId
      { 
        habilitador: usuario,
        status_oficial: "I",
        habilitado: "si",
      },
      { new: true, upsert: true } // new: devuelve el documento actualizado, upsert: crea uno si no existe
    );

    // console.log("Registro guardado o actualizado con éxito:", registroActualizado);
    return true; // Devuelve true si la operación fue exitosa
  } catch (error) {
    console.error("Error al guardar o actualizar el registro:", error);
    throw error; // Lanza el error para que pueda ser manejado donde se llame a la función
  }
}



async function descontar_register_wallet(body) {
  try {
    // Destructuramos los datos recibidos
    const { usuario, balance_restante, costo, symbol, canje } = body;

    // Creamos el objeto de actualización vacío
    let update = {};
    
    // Condicional para el símbolo
    if (symbol === 'BHRT') {
      update = {
        balance: balance_restante,
        ganancias_apuestas_segundoLugar: balance_restante,
        ganancias_apuestas_tercerLugar: 0,
        ganancias_apuestas_quintoLugar: 0,
        ganancias_apuestas_sextoLugar: 0
      };
    } else if (symbol === 'BHR') {
      update = {
        ganancias_apuestas_cuartoLugar: balance_restante
      };
    } else if (symbol === 'SWAP.HIVE') {
      // Si es SWAP.HIVE restamos el costo del balance actual
      update = {
        $inc: { balance: -costo } // Usamos $inc para restar del balance actual
      };
    }

    // Agregamos el nuevo canje al array usando $push
    update.$push = { canjes: canje };

    // Actualiza o crea un nuevo registro si no existe
    const registroActualizado = await walletsModel.findOneAndUpdate(
      { usuario: usuario }, // Filtro para encontrar el documento por 'usuario'
      update,
      { new: true, upsert: true } // Devuelve el documento actualizado y lo crea si no existe
    );

    // Devuelve true si la operación fue exitosa
    return true;
  } catch (error) {
    console.error("Error al guardar o actualizar el registro:", error);
    throw error; // Lanza el error para que pueda ser manejado en el controlador
  }
}


module.exports = {
get_wallet,
get_torneo,
get_equino,
register_canje,
register_torneo,
register_equino_torneo,
descontar_register_wallet
}


