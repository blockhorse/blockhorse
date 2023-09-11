const store = require('./store.js');

async function getTemporada(req, res) {
  try {
    // Llama a la función en tu store.js para obtener la temporada
    const temporada = await store.get_temporada({ id: '3' });

    // Si obtienes la temporada con éxito, responde con un objeto JSON
    res.status(200).json({ temporada });
  } catch (error) {
    // Si hay un error al obtener la temporada, responde con un código de estado de error
    console.error('Error al obtener la temporada:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = {
  getTemporada
};




