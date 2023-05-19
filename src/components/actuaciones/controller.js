const Model = require('./models.js');
const store = require('./store.js');

async function get_actuaciones(query) {
  try {
    const race = query.race;
    const actuaciones = await store.get_actuaciones({ raceid: race }, { _id: 0 });
    return actuaciones;
  } catch (error) {
    console.error('Error al obtener las actuaciones:', error);
    throw new Error('Error al obtener las actuaciones');
  }
}

module.exports = {
  get_actuaciones,
};
