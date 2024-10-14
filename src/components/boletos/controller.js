const Model = require('./models.js');
const store = require('./store.js');

async function get_boletos(query) {
  console.log("boletos query", query);
  try {
    const actuaciones = await store.get_boletos(query);
    return actuaciones;
  } catch (error) {
    console.error('Error al obtener las actuaciones:', error);
    throw new Error('Error al obtener las actuaciones');
  }
}

module.exports = {
  get_boletos,
};
