const axios = require('axios');

const HIVE_PRICE_APIS = [
  {
    name: 'Binance',
    url: 'https://api.binance.com/api/v3/ticker/price?symbol=HIVEUSDT',
    extract: data => parseFloat(data.price)
  },
  {
    name: 'CoinMarketCap',
    url: 'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=12434&range=1d', // ejemplo, puede necesitar API key
    extract: data => {
      // Ejemplo: extraer precio del objeto complejo
      if (data && data.data && data.data.quotes && data.data.quotes.length > 0) {
        return parseFloat(data.data.quotes[0].quote.USD.price);
      }
      return null;
    }
  },
  {
    name: 'CoinPaprika',
    url: 'https://api.coinpaprika.com/v1/tickers/hive-hive',
    extract: data => data && data.quotes && data.quotes.USD ? parseFloat(data.quotes.USD.price) : null
  }
  // Puedes agregar más APIs fiables aquí con su respectivo extractor
];

async function getHivePrice() {
  for (const api of HIVE_PRICE_APIS) {
    try {
      const response = await axios.get(api.url);
      const price = api.extract(response.data);
      if (price && !isNaN(price)) {
        console.log(`Precio obtenido desde ${api.name}:`, price);
        return price;
      }
    } catch (error) {
      console.error(`Error al obtener precio desde ${api.name}:`, error.message);
      continue;
    }
  }
  throw new Error('No se pudo obtener el precio de Hive de ninguna API');
}

module.exports = { getHivePrice };
