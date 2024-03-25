
const { findShopsByCity, findShopById } = require("../models/coffee.model");

exports.getShopsByCity = async (ctx, next) => {
  const { city } = ctx.params;
  const { dogFriendly, dairyFree, hasSeating } = ctx.query;
  
  const filters = {
    dogFriendly: dogFriendly === 'true',
    dairyFree: dairyFree === 'true',
    hasSeating: hasSeating === 'true',
  };

  try {
    const shops = await findShopsByCity(city, filters);
    ctx.body = { shops };
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

