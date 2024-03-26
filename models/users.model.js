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

  exports.findUserByUsername = async (username) => {
    try {
      await client.connect();

      const user = await client
        .db("coffee-conneisseur-api")
        .collection("users")
        .findOne({ username: username });
  
      if (!user) {
        throw new Error("User not found");
      } else {
        return user;
      }
    } catch (error) {
      console.error("Error finding user by username:", error);
      throw new Error("Failed to find user by username");
    } finally {
      await client.close();
    }
  };