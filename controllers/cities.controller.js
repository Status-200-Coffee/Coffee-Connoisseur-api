const { findCities, addCity } = require("../models/cities.model");

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
exports.postCity = async (ctx, next) => {
  const { city, latitude, longitude } = ctx.request.body;

  if (!city || !latitude || !longitude) {
    ctx.status = 400;
    ctx.body = { error: "City data is incomplete" };
    return;
  }

  const cityData = {
    city,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  };

  try {
    const newCity = await addCity(cityData);
    ctx.status = 201; 
    ctx.body = { city: newCity };
  } catch (error) {
    console.error("Error in postCity:", error);
    ctx.status = 500; 
    ctx.body = { error: "Failed to add city" };
  }
};