const cache = {};

function setCache(key, value, ttl = 60) {
  cache[key] = {
    value,
    expireAt: Date.now() + ttl * 1000,
  };
}

function getCache(key) {
  const data = cache[key];
  if (!data) return null;
  if (Date.now() > data.expireAt) {
    delete cache[key];
    return null;
  }
  return data.value;
}

module.exports = { setCache, getCache };
