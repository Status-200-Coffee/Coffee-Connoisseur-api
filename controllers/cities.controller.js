const { findCities } = require("../models/cities.model");

exports.getAllCities = async (ctx, next) => {
  try {
    const cities = await findCities();
    ctx.body = { cities };
  } catch (error) {
    next(error);
  }
};
