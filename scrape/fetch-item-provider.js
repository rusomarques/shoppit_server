const rp = require('request-promise');

exports.getItems = async (category, limit, offset = 0) => {
  try {
    const url = `https://canopy.co/ajax/product_feed?include_users=false&order=trending&query=${category}&type=category&limit=${limit}&offset=${offset}`;
    const data = await rp(url);
    const items = JSON.parse(data).products;
    return items;
  } catch (e) {
    console.log('couldnt fetch canopy', e); // eslint-disable-line no-console
  }
};
