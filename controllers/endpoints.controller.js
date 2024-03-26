const endpoints = require("../endpoints.json");

exports.getEndpoints = async (ctx, next) => {
  try {
    ctx.body = { endpoints };
  } catch (error) {
    next(error);
  }
};
