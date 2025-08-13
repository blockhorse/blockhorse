require('dotenv').config();
const Model = require('./models.js');
const mongoose = require('mongoose');

const MONGOOSE_USER = process.env.MONGOUSE; // corregí variable para evitar confusión
const URI_MD = `mongodb://${MONGOOSE_USER}@cluster3479-shard-00-00.r5klk.mongodb.net:27017,cluster3479-shard-00-01.r5klk.mongodb.net:27017,cluster3479-shard-00-02.r5klk.mongodb.net:27017/EQUINE?ssl=true&replicaSet=atlas-ts4xhm-shard-0&authSource=admin&retryWrites=true&w=majority&readPreference=primary`;

mongoose.Promise = global.Promise;
mongoose.connect(URI_MD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('Conexión a base de datos establecida.');

async function get_participantes({ equineId, race }) {
  let equineIds = [];

  if (!equineId) {
    throw new Error('equineId es requerido');
  }

  if (typeof equineId === 'string' && equineId.includes(',')) {
    equineIds = equineId.split(',').map((id) => Number(id.trim()));
  } else if (Array.isArray(equineId)) {
    equineIds = equineId.map((id) => Number(id));
  } else {
    equineIds = [Number(equineId)];
  }

  const filtro = {
    equineId: { $in: equineIds },
  };

  // Si se provee race, agregamos al filtro
  if (race !== undefined && race !== null) {
    filtro.race = (race); // o string según el tipo en tu DB
  }

  console.log('Ejecutando consulta get_participantes con filtro:', filtro);

  try {
    const participantes = await Model.find(filtro);
    console.log(`Resultados encontrados: ${participantes.length}`);
    return participantes;
  } catch (e) {
    console.error('Error en consulta de participantes:', e);
    throw e;
  }
}

module.exports = {
  get_participantes,
};
