const { client } = require("../db/connection");

let dbName = "coffee-conneisseur-api";

if (process.env.NODE_ENV === "test") {
  dbName += "-test";
}

exports.findCities = async () => {
  try {
    await client.connect();

    const result = await client
      .db(dbName)
      .collection("cities")
      .find()
      .toArray();

    return result;
  } catch (error) {
    return error;
  } finally {
    await client.close();
  }
};
