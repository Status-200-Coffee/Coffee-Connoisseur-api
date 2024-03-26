const { findUsers, updateUserByUsername } = require("../models/users.model");

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
