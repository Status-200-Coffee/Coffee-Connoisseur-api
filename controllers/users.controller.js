const {
  findUsers,
  updateUserByUsername,
  insertUser,
} = require("../models/users.model");

exports.getUsers = async (ctx, next) => {
  try {
    const users = await findUsers();
    ctx.body = { users };
  } catch (error) {
    console.error("Error getting users:", error);
    ctx.status = 500;
    ctx.body = { error: "Failed to retrieve users" };
  }
};

exports.postUser = async (ctx, next) => {
  const newUser = ctx.request.body;
  newUser.coffeeCollected = 1;
  newUser.photosPosted = [];
  newUser.favouriteShops = [];
  try {
    const user = await insertUser(newUser);
    ctx.status = 201;
    ctx.body = { user };
  } catch (error) {
    next(error);
  }
};

exports.patchUserByUsername = async (ctx, next) => {
  const { username } = ctx.params;
  const update = ctx.request.body;
  try {
    const user = await updateUserByUsername(username, update);
    ctx.body = { user };
  } catch (error) {
    next(error);
  }
};
