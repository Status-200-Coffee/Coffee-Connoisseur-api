const { client } = require("../db/connection");
let dbName = "coffee-conneisseur-api";

if (process.env.NODE_ENV === "test") {
  dbName += "-test";
}

exports.findUsers = async () => {
  try {
    const result = await client.db(dbName).collection("users").find().toArray();

    return result;
  } catch (error) {
    console.error("Error finding users:", error);
    throw error;
  }
};

exports.insertUser = async (newUser) => {
  if (!newUser.username || !newUser.email || !newUser.password) {
    throw new Error();
  }
  const insertUser = await client
    .db(dbName)
    .collection("users")
    .insertOne(newUser);

  const _id = insertUser.insertedId;

  const user = await client.db(dbName).collection("users").findOne({ _id });

  return user;
};

exports.updateUserByUsername = async (
  username,
  {
    newPhoto,
    changeCoffee,
    addToFavourites,
    removeFromFavourites,
    profilePicture,
  }
) => {
  if (
    !newPhoto &&
    !changeCoffee &&
    !addToFavourites &&
    !removeFromFavourites &&
    !profilePicture
  ) {
    throw new Error();
  }
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

  if (profilePicture) {
    if (typeof profilePicture !== "string") {
      throw new Error();
    }
    change.profilePicture = profilePicture;
    user.profilePicture = profilePicture;
  }

  if (changeCoffee) {
    let coffee = user.coffeeCollected;
    if (+changeCoffee === 1) {
      coffee++;
    }
    if (+changeCoffee === -1) {
      coffee = 0;
    }
    if (+changeCoffee !== 1 && +changeCoffee !== -1) {
      throw new Error();
    }
    change.coffeeCollected = coffee;
    user.coffeeCollected = coffee;
  }
  if (addToFavourites) {
    const [[city, shopId]] = Object.entries(addToFavourites);
    const favourites = user.favouriteShops;
    for (const key in favourites) {
      if (key === city) {
        favourites[key].push(shopId);
      }
      if (!Object.keys(favourites).includes(city)) {
        favourites[city] = [shopId];
      }
    }
    change.favouriteShops = favourites;
    user.favouriteShops = favourites;
  }
  if (removeFromFavourites) {
    const [[city, shopId]] = Object.entries(removeFromFavourites);
    const favourites = user.favouriteShops;
    for (const key in favourites) {
      if (key === city) {
        const shopsArray = favourites[key];
        const updatedFavourites = shopsArray.filter((shop) => shop !== shopId);
        favourites[key] = updatedFavourites;
      }
    }
    change.favouriteShops = favourites;
    user.favouriteShops = favourites;
  }
  const updateUser = await client
    .db(dbName)
    .collection("users")
    .updateOne({ username }, { $set: change });

  if (updateUser.acknowledged === true) {
    return user;
  }
};

exports.findUserByUsername = async (username) => {
  try {
    const user = await client
      .db(dbName)
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
  }
};
