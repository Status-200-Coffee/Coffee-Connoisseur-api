const { client } = require("../db/connection");

exports.findCities = async () => {
  try {
    await client.connect();

    const result = await client
      .db("coffee-conneisseur-api")
      .collection("cities")
      .find()
      .toArray();

    return result;
  } catch (error) {
    return error
  } finally {
    await client.close();
  }
};
