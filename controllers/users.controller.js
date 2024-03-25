const { findUsers } = require("../models/users.model");

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