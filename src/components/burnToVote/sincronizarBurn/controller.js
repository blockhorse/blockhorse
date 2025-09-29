const store = require("./store");
const { getLatestTransactions } = require("./hiveNetwor.js");
const TWO_HOURS =1 * 60 * 60 * 1000;

/**
 * Synchronizes token burns for a given user.
 * Enforces a 2-hour minimum delay between sync attempts.
 * Fetches new transactions from blockchain, inserts missing records, and updates last sync timestamp.
 *
 * @param {string} userId - The user ID to synchronize.
 * @returns {Object} Summary of the sync result with status and counts.
 * @throws {Error} If sync is attempted before 2 hours have elapsed since last sync.
 */
async function sincronizarBurn(userId) {
  try {
    // Verify last sync time; restrict sync calls to once every 2 hours.
    const lastSync = await store.getLastSync(userId);
    const now = Date.now();
    if (lastSync && (now - new Date(lastSync).getTime()) < TWO_HOURS) {
      throw new Error("Synchronization is only allowed once every 2 hours.");
    }

    // Retrieve user's current burn history from DB.
    const currentHistory = await store.getVotesByUser(userId);

    // Determine last processed blockchain block number for incremental fetching.
    const lastBlock = currentHistory.length > 0
      ? Math.max(...currentHistory.map(v => v.blockNumber || 0))
      : 0;

    // Fetch latest transactions from blockchain starting from last processed block.
    const transactions = await getLatestTransactions(userId, lastBlock);

    // Filter transactions not yet recorded in DB by comparing transactionHash.
    const missing = transactions.filter(tx =>
      !currentHistory.find(h => h.transactionHash === tx.transactionHash)
    );

    // Insert missing burn records to DB.
    await store.insertMissingBurns(missing, userId);

    // Update last synchronization timestamp.
    await store.updateLastSync(userId, new Date(now));

    // Return a success response with useful counts to client.
    return {
      success: true,
      message: "Synchronization completed successfully.",
      synced: missing.length,
      totalInBlockchain: transactions.length,
      totalInDB: currentHistory.length
    };
  } catch (error) {
    // Return a standardized error structure.
    return {
      success: false,
      message: error.message || "Internal synchronization error."
    };
  }
}

module.exports = {
  sincronizarBurn,
};
