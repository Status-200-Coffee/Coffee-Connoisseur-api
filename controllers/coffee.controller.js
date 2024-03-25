
const { findShopsByCity, findShopById } = require("../models/coffee.model");

exports.getShopsByCity = async (ctx, next) => {
  const { city } = ctx.params;
  console.log(city)
  try {
    const shops = await findShopsByCity(city);
    ctx.body = {shops}
  } catch (error) {
    next(error);
  }
};


exports.getShopById = async (ctx, next) => {
  const { city, shop_id } = ctx.params;
  try {
    const shop = await findShopById(city, +shop_id);
    ctx.body = { shop };
  } catch (error) {
    next(error);
  }
};

