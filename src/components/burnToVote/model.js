// /components/burnVote/model.js
const axios = require('axios');




const getHivePrice = async () => {
  try {
    const res = await axios.get(
      'https://api.binance.com/api/v3/ticker/price?symbol=HIVEUSDT'
    );
    return parseFloat(res.data.price);
  } catch (error) {
    console.error('Error al obtener precio desde Binance:', error.message);
    return null;
  }
};



const getBhrtToHivePrice = async () => {
  const res = await axios.post('https://dswap-api.dswap.trade/api/SwapRequest/CalculateSwapOutput', {
    TokenInput: 'BHRT',
    TokenInputAmount: 1,
    TokenOutput: 'SWAP.HIVE',
    Chain: 1,
  });
  return parseFloat(res.data.BaseTokenAmount); // BHRT → HIVE
};

const getVotingPower = async (account) => {
  const res = await axios.post('https://api.hive.blog', {
    jsonrpc: '2.0',
    method: 'condenser_api.get_accounts',
    params: [[account]],
    id: 1,
  });
  const accountData = res.data.result[0];
  const vp = parseInt(accountData.voting_power, 10) / 100; // Devuelve 0 - 10000 → convertimos a 0-100
  return vp;
};


const getBalances = async (account) => {
  const res = await axios.post('https://api.hive-engine.com/rpc/contracts', {
    jsonrpc: '2.0',
    method: 'find',
    params: {
      contract: 'tokens',
      table: 'balances',
      query: { account },
    },
    id: 1,
  });

  const balances = res.data.result;

  const bhrt = balances.find((b) => b.symbol === 'BHRT')?.balance || 0;
  const hive = balances.find((b) => b.symbol === 'SWAP.HIVE')?.balance || 0;

  return {
    BHRT: parseFloat(bhrt),
    HIVE: parseFloat(hive),
  };
};



const getAccountInfo = async (username) => {
  const res = await axios.post("https://api.hive.blog", {
    jsonrpc: "2.0",
    method: "condenser_api.get_accounts",
    params: [[username]],
    id: 1,
  });
  return res.data.result[0];
};


module.exports = {
  getAccountInfo,
  getHivePrice,
  getBhrtToHivePrice,
  getVotingPower,
  getBalances,
};
