// const axios = require('axios');
// const { getCache, setCache } = require('./cache');

// const HIVE_RPC = 'https://api.hive.blog';

// async function rpcCall(method, params = []) {
//   const response = await axios.post(HIVE_RPC, {
//     jsonrpc: '2.0',
//     method,
//     params,
//     id: 1
//   });
//   return response.data.result;
// }

// async function getGlobalProperties() {
//   const cached = getCache('global_properties');
//   if (cached) return cached;

//   const [rewardFund, dynamicProps] = await Promise.all([
//     rpcCall('condenser_api.get_reward_fund', ['post']),
//     rpcCall('condenser_api.get_dynamic_global_properties')
//   ]);

//   const result = {
//     reward_balance: parseFloat(rewardFund.reward_balance.split(' ')[0]),
//     recent_claims: parseFloat(rewardFund.recent_claims),
//     total_vesting_fund_hive: parseFloat(dynamicProps.total_vesting_fund_hive.split(' ')[0]),
//     total_vesting_shares: parseFloat(dynamicProps.total_vesting_shares.split(' ')[0]),
//   };

//   setCache('global_properties', result, 300); // 5 minutos
//   return result;
// }

// module.exports = { getGlobalProperties };



// const axios = require('axios');
// const { getCache, setCache } = require('./cache');
// const store = require("./store");


// /**
//  * Devuelve un arreglo de URLs de nodos activos desde la base de datos.
//  */
//  const FIXED_NODES = [
//   'https://api.deathwing.me',
//   'https://api.openhive.network',
//   'https://api.hive.blog',
//   'https://api.c0ff33a.uk',
//   'https://anyx.io'
// ];

// async function rpcCallAnyNode(method, params = []) {
//   for (const nodeUrl of FIXED_NODES) {
//     try {
//       const result = await rpcCall(nodeUrl, method, params);
//       if (result) return result;
//     } catch (error) {
//       console.error(`Fallo en nodo ${nodeUrl}: ${error.message}`);
//       continue; // Intenta siguiente nodo
//     }
//   }
//   throw new Error('No hay nodos activos disponibles o todos fallaron');
// }


// async function rpcCall(rpcUrl, method, params = []) {
//   const response = await axios.post(rpcUrl, {
//     jsonrpc: '2.0',
//     method,
//     params,
//     id: 1
//   });
//   return response.data.result;
// }
// /**
//  * Obtiene y cachea las propiedades globales de Hive usando cualquier nodo activo.
//  */
// async function getGlobalProperties() {
//   const cached = getCache('global_properties');
//   if (cached) return cached;

//   const [rewardFund, dynamicProps] = await Promise.all([
//     rpcCallAnyNode('condenser_api.get_reward_fund', ['post']),
//     rpcCallAnyNode('condenser_api.get_dynamic_global_properties')
//   ]);

//   const result = {
//     reward_balance: parseFloat(rewardFund.reward_balance.split(' ')[0]),
//     recent_claims: parseFloat(rewardFund.recent_claims),
//     total_vesting_fund_hive: parseFloat(dynamicProps.total_vesting_fund_hive.split(' ')[0]),
//     total_vesting_shares: parseFloat(dynamicProps.total_vesting_shares.split(' ')[0]),
//   };

//   setCache('global_properties', result, 300); // 5 minutos
//   return result;
// }

// module.exports = { getGlobalProperties };



const axios = require('axios');

const FIXED_NODES = [
  'https://api.deathwing.me',
  'https://api.openhive.network',
  'https://api.hive.blog',
  'https://api.c0ff33a.uk',
  'https://anyx.io'
];

async function rpcCall(rpcUrl, method, params = []) {
  const response = await axios.post(rpcUrl, {
    jsonrpc: '2.0',
    method,
    params,
    id: 1
  });
  return response.data.result;
}

async function rpcCallAnyNode(method, params = []) {
  for (const nodeUrl of FIXED_NODES) {
    try {
      const result = await rpcCall(nodeUrl, method, params);
      if (result) return result;
    } catch (error) {
      console.error(`Fallo en nodo ${nodeUrl}: ${error.message}`);
      continue;
    }
  }
  throw new Error('No hay nodos activos disponibles o todos fallaron');
}

async function getGlobalProperties() {
  const [rewardFund, dynamicProps] = await Promise.all([
    rpcCallAnyNode('condenser_api.get_reward_fund', ['post']),
    rpcCallAnyNode('condenser_api.get_dynamic_global_properties')
  ]);

  return {
    reward_balance: parseFloat(rewardFund.reward_balance.split(' ')[0]),
    recent_claims: parseFloat(rewardFund.recent_claims),
    total_vesting_fund_hive: parseFloat(dynamicProps.total_vesting_fund_hive.split(' ')[0]),
    total_vesting_shares: parseFloat(dynamicProps.total_vesting_shares.split(' ')[0]),
  };
}

module.exports = { getGlobalProperties };
