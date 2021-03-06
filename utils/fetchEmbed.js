// utils -> fetchEmbed

const fetchEmbed = (url, provider, params) => {
  return new Promise((resolve, reject) => {
    let {
      provider_name, // eslint-disable-line camelcase
      provider_url, // eslint-disable-line camelcase
      url: resourceUrl,
    } = provider;


    resourceUrl = resourceUrl.replace(/\{format\}/g, 'json');

    let link = `https://cors-anywhere.herokuapp.com/${resourceUrl}?format=json&url=${url}`;
    link = params && params.maxwidth ? `${link}&maxwidth=${params.maxwidth}` : link;
    link = params && params.maxheight ? `${link}&maxheight=${params.maxheight}` : link;

    return fetch(link, {method: 'GET', mode: 'cors'}).then((res) => {
      return res.json();
    }).then((json) => {
      json.provider_name = provider_name; // eslint-disable-line camelcase
      json.provider_url = provider_url; // eslint-disable-line camelcase
      return resolve(json);
    }).catch((err) => {
      return reject(err);
    });
  });
};

module.exports = fetchEmbed;
