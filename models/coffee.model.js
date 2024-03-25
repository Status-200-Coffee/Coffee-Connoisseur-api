const { client } = require("../db/connection");

exports.findShopsByCity = async (city, filters) => {
  try {
    await client.connect();
    const query = { city }; 
    if (filters) {
      if (filters.dogFriendly) {
        query.dogFriendly = true;
      }
      if (filters.dairyFree) {
        query.dairyFree = true;
      }
      if (filters.hasSeating) {
        query.hasSeating = true;
      }
    }

    const result = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city}`)
      .find(query)
      .toArray();

    if (!result) {
      throw new Error('No shops found');
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error finding shops:", error);
    throw error;
  } finally {
    await client.close();
  }
};
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
