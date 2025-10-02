const store = require('./store');

async function processBurnVote(data) {
  // Aquí se puede añadir lógica adicional de validación, por ejemplos:
  // - Validar formatos
  // - Validar relación entre valores
  // - Consultar blockchain para validar transactionHash (opcional)
  // todo por salvers

  // Por ahora, solo guardamos directamente
  const savedRecord = await store.saveBurnVote(data);
  return savedRecord;
}

module.exports = {
  processBurnVote,
};
