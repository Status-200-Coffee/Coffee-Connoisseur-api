const { findUsers, findUserByUsername } = require("../models/users.model");

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

exports.getUserByUsername = async (ctx, next) => {
    const { username } = ctx.params;
  
    try {
      const user = await findUserByUsername(username);
      ctx.body = {user}; 
    } catch (error) {
      ctx.status = 404;
      ctx.body = { error: error.message };
      return next();
    }
  };