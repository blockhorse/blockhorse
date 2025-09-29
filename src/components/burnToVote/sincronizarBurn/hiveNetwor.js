const axios = require('axios');

async function getLatestTransactions() {
  const account = "bhr-null";
  const startBlock = 0;

  try {
    const response = await axios.get('https://accounts.hive-engine.com/accountHistory', {
      params: {
        account,
        startBlock,
        limit: 15,
      },
    });

    // Aplicar filtro para solo tokens_transfer y memo que sea "Burn tokens to vote on ..."
    const filteredTransactions = response.data.filter(tx =>
      tx.blockNumber > startBlock &&
      tx.operation === "tokens_transfer" &&
      tx.memo &&
      tx.memo.startsWith("Burn tokens to vote on ")
    );

    console.log("filteredTransactions", filteredTransactions);

    return filteredTransactions;
  } catch (error) {
    console.error('Error consultando Hive:', error);
    return [];
  }
}

module.exports = { getLatestTransactions };

