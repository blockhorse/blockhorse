const axios = require('axios');
const { getCache, setCache } = require('./cache');

const HIVE_RPC = 'https://api.hive.blog';

async function rpcCall(method, params = []) {
  const response = await axios.post(HIVE_RPC, {
    jsonrpc: '2.0',
    method,
    params,
    id: 1
  });
  return response.data.result;
}

async function getGlobalProperties() {
  const cached = getCache('global_properties');
  if (cached) return cached;

  const [rewardFund, dynamicProps] = await Promise.all([
    rpcCall('condenser_api.get_reward_fund', ['post']),
    rpcCall('condenser_api.get_dynamic_global_properties')
  ]);

  const result = {
    reward_balance: parseFloat(rewardFund.reward_balance.split(' ')[0]),
    recent_claims: parseFloat(rewardFund.recent_claims),
    total_vesting_fund_hive: parseFloat(dynamicProps.total_vesting_fund_hive.split(' ')[0]),
    total_vesting_shares: parseFloat(dynamicProps.total_vesting_shares.split(' ')[0]),
  };

  setCache('global_properties', result, 300); // 5 minutos
  return result;
}

module.exports = { getGlobalProperties };
