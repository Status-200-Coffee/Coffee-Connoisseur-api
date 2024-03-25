const { findShopsByCity, findShopById, updateShopById } = require("../models/coffee.model");

exports.getShopsByCity = async (ctx, next) => {
  const { city } = ctx.params;

  const { dogFriendly, dairyFree, hasSeating, lat, long } = ctx.query;
  
  const filters = {
    dogFriendly: dogFriendly === 'true',
    dairyFree: dairyFree === 'true',
    hasSeating: hasSeating === 'true',
    lat,
    long
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

