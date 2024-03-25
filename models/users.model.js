const { client } = require("../db/connection");
let dbName = "coffee-conneisseur-api";

if (process.env.NODE_ENV === "test") {
  dbName += "-test";
}

exports.findUsers = async () => {
    try {
      await client.connect();
  
      const result = await client
        .db(dbName)
        .collection("users")
        .find()
        .toArray();
  
      return result;
    } catch (error) {
      console.error("Error finding users:", error);
      throw error;
    } finally {
      await client.close();
    }
  };