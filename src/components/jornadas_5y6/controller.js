// controller.js
const store = require('./store');

// Función para obtener la jornada por su número
const get_jornada = async (query) => {
  console.log("quer", query);
  try {
    const jornadaNumber = query.jornada;
    console.log("jornadaNumber", jornadaNumber);
    if (!jornadaNumber) {
      throw new Error('El parámetro jornada es necesario.');
    }

    const jornadaData = await store.getJornadaByNumber(jornadaNumber);

    if (!jornadaData) {
      return { success: false, message: 'La jornada no se encontró.', data: null };
    }

    return { success: true, message: 'Jornada encontrada exitosamente.', data: jornadaData };
  } catch (error) {
    return { success: false, message: error.message, data: null };
  }
};

module.exports = {
  get_jornada,
};
