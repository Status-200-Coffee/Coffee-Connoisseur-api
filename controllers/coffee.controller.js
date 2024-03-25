const { findShopsByCity} = require("../models/coffee.model");

exports.getShopsByCity = async (ctx, next) => {
  const { city } = ctx.params;
  console.log(city)
  try {
    const shops = await findShopsByCity(city);
    ctx.body = shops
  } catch (error) {
    next(error);
  }
};