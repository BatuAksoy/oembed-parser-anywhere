// main

const {
  isValidURL,
  findProvider,
  fetchEmbed,
} = require('./utils');


const extract = (url, params) => {
  return new Promise((resolve, reject) => {
    if (!isValidURL(url)) {
      return reject(new Error('Invalid input URL'));
    }
    let p = findProvider(url);
    if (!p) {
      return reject(new Error(`No provider found with given url "${url}"`));
    }
    return resolve(fetchEmbed(url, p, params));
  });
};

const hasProvider = (url) => {
  return findProvider(url) !== null;
};

const extractCached = (() => {
  const cache = {};
  return (src) => {
    if (!(src in cache)) {
      cache[src] = extract(src);
    }
    return cache[src];
  };
})();

module.exports = {
  extract,
  hasProvider,
  extractCached,
};
