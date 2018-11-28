const rp = require('request-promise');

exports.getCategoryItems = async (
  mainCategory,
  category,
  limit = 10,
  offset = 0
) => {
  // mainCatetgory = gifts || categories
  const categoryItems = {
    mainCategory,
    category,
    limit,
    offset
  };

  // fetch canopy and save items
  try {
    const url = `https://canopy.co/ajax/product_feed?include_users=false&order=trending&query=${category}&type=category&limit=${limit}&offset=${offset}`;
    const data = await rp(url);
    const items = JSON.parse(data).products;
    categoryItems.items = items;
  } catch (error) {
    console.log('couldnt fetch canopy', error); // eslint-disable-line no-console
  }

  return categoryItems;
};
