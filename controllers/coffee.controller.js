const { findShopById } = require("../models/coffee.model");

exports.getShopById = async (ctx, next) => {
  const { city, shop_id } = ctx.params;
  try {
    const shop = await findShopById(city, +shop_id);
    ctx.body = { shop };
  } catch (error) {
    next(error);
  }
};
