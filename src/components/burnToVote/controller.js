const model = require('./model');
 const {getHivePrice} = require('./../../atomos/Hive/HivePrice.js')
const { getGlobalProperties } = require('./model/global');
const { estimateVoteUSD } = require('./model/voteEstimator');

const getFullInfo = async (account, pesoVoto = 100) => {
  const cuentaCuracion = "bhr-curation";

  try {
    

    const [
      hivePrice,
      bhrtHivePrice,
      votePower, // ← No lo usaremos si forzamos 100%
      balances,
      accountInfo,
      globals
    ] = await Promise.all([
      getHivePrice(),
      model.getBhrtToHivePrice(),
      model.getVotingPower(cuentaCuracion),
      model.getBalances(account),
      model.getAccountInfo(cuentaCuracion),
      getGlobalProperties()
    ]);

    // Logs para debugging
    // console.log("✔️ Datos obtenidos:");
    // console.log({ hivePrice, bhrtHivePrice, balances, accountInfo, globals });

    // Validaciones
    if (!accountInfo?.vesting_shares || !globals?.total_vesting_fund_hive || !globals?.total_vesting_shares) {
      throw new Error("❌ Faltan datos críticos para calcular el HP efectivo.");
    }

    const vestingShares = parseFloat(accountInfo.vesting_shares.split(' ')[0]);
    const delegated = parseFloat(accountInfo.delegated_vesting_shares.split(' ')[0]);
    const received = parseFloat(accountInfo.received_vesting_shares.split(' ')[0]);

    const hpEffective = (vestingShares - delegated + received) *
      (globals.total_vesting_fund_hive / globals.total_vesting_shares);

    // console.log("HP efectivo calculado:", hpEffective);

    const voteDollarEstimate = estimateVoteUSD({
      hpEffective,
      votingPower: 100, // ← Forzado al 100%
      voteWeight: pesoVoto, // ← peso entre 50% y 100%
      hivePrice,
      reward_balance: globals.reward_balance,
      recent_claims: globals.recent_claims,
      total_vesting_fund_hive: globals.total_vesting_fund_hive,
      total_vesting_shares: globals.total_vesting_shares,
    });

    console.log(`💰 Voto estimado con peso ${pesoVoto}%:`, voteDollarEstimate);

    return {
      hivePrice,
      bhrtHivePrice,
      balances,
      voteDollarEstimate,
    };

  } catch (error) {
    console.error("🔥 Error en getFullInfo:", error);
    return { error: true, message: error.message };
  }
};

module.exports = { getFullInfo };
