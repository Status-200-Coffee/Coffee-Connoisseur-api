const { findShopsByCity, findShopById, updateShopById, addShopToCity } = require("../models/coffee.model");

exports.getShopsByCity = async (ctx, next) => {
  const { city } = ctx.params;

  const { dogFriendly, dairyFree, hasSeating, lat, long, sortBy, orderBy } = ctx.query;

  
  const filters = {
    dogFriendly: dogFriendly === 'true',
    dairyFree: dairyFree === 'true',
    hasSeating: hasSeating === 'true',
    lat,
    long
  };

  try {
    const shops = await findShopsByCity(city, filters, sortBy, orderBy);
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

exports.postShopToCity = async (ctx, next) => {
  const { city } = ctx.params;
  const { name, address, dogFriendly, dairyFree, hasSeating, lat, long, rating, userImages } = ctx.request.body;

  if (!name || !address || !lat || !long || !rating) {
    ctx.status = 400;
    ctx.body = { error: "Shop data is incomplete" };
    return;
  }

  const shopData = {
    name,
    address,
    dogFriendly: dogFriendly === 'true',
    dairyFree: dairyFree === 'true',
    hasSeating: hasSeating === 'true',
    latitude: parseFloat(lat),
    longitude: parseFloat(long),
    rating: parseFloat(rating),
    userImages: userImages ? userImages.split(',') : [],
  };

  try {
    const newShop = await addShopToCity(city, shopData);
    ctx.status = 201;
    ctx.body = { shop: newShop };
  } catch (error) {
    console.error("Error posting shop to city:", error);
    ctx.status = 500;
    ctx.body = { error: "Failed to add shop to city" };
  }
};
