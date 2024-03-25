const { client } = require("../db/connection");

exports.findUsers = async () => {
    try {
      await client.connect();
  
      const result = await client
        .db("coffee-conneisseur-api")
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