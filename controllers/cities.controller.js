const { findCities } = require("../models/cities.model");

exports.getAllCities = async (ctx, next) => {
  const { lat, long } = ctx.query;
  try {
    if (lat && long) {
      const city = await findCities(lat, long);
      ctx.body = { city };
    } else {
      const cities = await findCities();
      ctx.body = { cities };
    }
  } catch (error) {
    next(error);
  }
};
