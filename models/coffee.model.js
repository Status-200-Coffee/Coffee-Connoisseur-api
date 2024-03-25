const { client } = require("../db/connection");

exports.findShopsByCity = async (city) => {
  try {
    await client.connect();
    const result = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city}`)
      .find()
      .toArray(); 
    if (!result) {
      throw new Error('No shops found');
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error finding shops:", error);
    throw error; 
  } 
};