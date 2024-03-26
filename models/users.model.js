const { client } = require("../db/connection");
let dbName = "coffee-conneisseur-api";

if (process.env.NODE_ENV === "test") {
  dbName += "-test";
}

exports.findUsers = async () => {
  try {
    await client.connect();

    const result = await client.db(dbName).collection("users").find().toArray();

    return result;
  } catch (error) {
    console.error("Error finding users:", error);
    throw error;
  } finally {
    await client.close();
  }
};

exports.updateUserByUsername = async (
  username,
  { newPhoto, changeCoffee, addToFavourites, removeFromFavourites }
) => {
  if (!newPhoto && !changeCoffee && !addToFavourites && !removeFromFavourites) {
    throw new Error();
  }
  await client.connect();

  const user = await client
    .db(dbName)
    .collection("users")
    .findOne({ username });

  const change = {};

  if (newPhoto) {
    if (typeof newPhoto !== "string") {
      throw new Error();
    }
    const photos = user.photosPosted;
    photos.unshift(newPhoto);
    change.photosPosted = photos;
    user.photosPosted = photos;
  }

  if (changeCoffee) {
    let coffee = user.coffeeCollected;
    if (+changeCoffee === 1) {
      coffee++;
    }
    if (+changeCoffee === -1) {
      coffee = 0;
    }
    change.coffeeCollected = coffee;
    user.coffeeCollected = coffee;
  }

  if (addToFavourites) {
    const favourites = user.favouriteShops;
    favourites.unshift(5);
    change.favouriteShops = favourites;
    user.favouriteShops = favourites;
  }

  if (removeFromFavourites) {
    const favourites = user.favouriteShops;
    const updatedFavourites = favourites.filter(
      (shop) => shop !== removeFromFavourites
    );
    change.favouriteShops = updatedFavourites;
    user.favouriteShops = updatedFavourites;
  }

  const updateUser = await client
    .db(dbName)
    .collection("users")
    .updateOne({ username }, { $set: { change } });

  return user;
};
