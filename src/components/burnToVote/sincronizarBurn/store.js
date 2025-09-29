//store
const BurnedPost = require("./../consultaAbase/model.js");
const SyncModel = require('./model.js')
const { mapHiveTransactionToBurnedPost } = require("./helpers/utils.js");

async function getVotesByUser(userId) {
  if (!userId) throw new Error("userId requerido");
  return BurnedPost.find({ userId })
    .sort({ burnedAt: -1 })
    .limit(20)
    .exec();
}

async function getLastSync(userId) {
  // Implementa según tu esquema,
  // p.ej buscar registro donde guardas la última sincronización por usuario
  // ejemplo ficticio:
  const userSync = await SyncModel.findOne({ userId });
  return userSync ? userSync.lastSync : null;
}

// Insertar registros faltantes de blockchain
const insertMissingBurns = async (transactions) => {
  const mappedRecords = transactions
    .map(mapHiveTransactionToBurnedPost)
    .filter(record => record !== null);

  for (const record of mappedRecords) {
    const exists = await BurnedPost.findOne({ transactionHash: record.transactionHash });
    if (!exists) {
      try {
        await new BurnedPost(record).save();
      } catch (error) {
        if (error.code === 11000) {
          // Error de clave duplicada, ignorar o loguear
          console.log("Clave duplicada en transactionHash:", record.transactionHash);
        } else {
          throw error; // Otros errores si quieres manejar
        }
      }
    }
  }
};


async function updateLastSync(userId, date) {
  // Guarda o actualiza el registro de última sincronización
  await SyncModel.updateOne(
    { userId },
    { $set: { lastSync: date } },
    { upsert: true }
  );
}

module.exports = {
  getVotesByUser,
  getLastSync,
  insertMissingBurns,
  updateLastSync,
};




