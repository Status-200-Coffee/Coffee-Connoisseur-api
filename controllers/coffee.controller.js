const { findShopById, updateShopById } = require("../models/coffee.model");

exports.getShopById = async (ctx, next) => {
  const { city, shop_id } = ctx.params;
  try {
    const shop = await findShopById(city, +shop_id);
    ctx.body = { shop };
  } catch (error) {
    next(error);
  }
};

exports.patchShopById = async (ctx, next) => {
  const { city, shop_id } = ctx.params;
  const { rating, newPhoto } = ctx.request.body;
  try {
    const shop = await updateShopById(city, +shop_id, rating, newPhoto);
    ctx.body = { shop };
  } catch (error) {
    next(error);
  }
};
