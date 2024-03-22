const { client } = require("../db/connection");

exports.findShopById = async (city, shop_id) => {
  await client.connect();
  const result = await client
    .db("coffee-conneisseur-api")
    .collection(`coffee-shops-${city}`)
    .findOne({ _id: shop_id });
  if (!result) {
    throw new Error();
  } else {
    return result;
  }
};
