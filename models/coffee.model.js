const { client } = require("../db/connection");
const { haversineDistanceBetweenPointsInKm } = require("../utils");

exports.findShopsByCity = async (city, filters) => {
  try {
    await client.connect();
    const query = { city }; 
    if (filters) {
      if (filters.dogFriendly) {
        query.dogFriendly = true;
      }
      if (filters.dairyFree) {
        query.dairyFree = true;
      }
      if (filters.hasSeating) {
        query.hasSeating = true;
      }
    }

    const result = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city}`)
      .find(query)
      .toArray();

    if (filters.lat && filters.long) {
      const resultWithDistanceProperty = result.map((shop) => {
        shop.distance = haversineDistanceBetweenPointsInKm(filters.lat, filters.long, shop.latitude, shop.longitude)
        return shop
      })
      const sortedResult = resultWithDistanceProperty.sort((shop1, shop2) => (shop1.distance > shop2.distance) ? 1 : (shop1.distance < shop2.distance) ? -1 : 0)

      return sortedResult
    }

    if (!result) {
      throw new Error('No shops found');
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error finding shops:", error);
    throw error;
  } finally {
    await client.close();
  }
};

exports.findShopById = async (city, shop_id) => {
  await client.connect();
  const result = await client
    .db("coffee-conneisseur-api")
    .collection(`coffee-shops-${city}`)
    .findOne({ _id: shop_id });
  if (!result) {
    throw new Error();
  } else {
    return result;
  }
};

exports.updateShopById = async (
  city,
  shop_id,
  newRating = null,
  newPhoto = null
) => {

  if (!newRating && !newPhoto) {
    throw new Error();
  }
  await client.connect();

  const shop = await client
    .db("coffee-conneisseur-api")
    .collection(`coffee-shops-${city}`)
    .findOne({ _id: shop_id });

  if (newRating) {
    const currRating = +shop.rating;
    const currTotalRatings = +shop.totalRatings;
    const updateTotalRatings = currTotalRatings + 1;
    const updateRating = (
      (currRating * currTotalRatings + +newRating) /
      updateTotalRatings
    ).toFixed(1);

    const updateShop = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city}`)
      .updateOne(
        { _id: shop_id },
        { $set: { totalRatings: updateTotalRatings, rating: updateRating } }
      );

    shop.rating = +updateRating;
    shop.totalRatings = +updateTotalRatings;
  }

  if (newPhoto) {
    const photos = shop.userImages;
    photos.push(newPhoto);

    const updateShop = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city}`)
      .updateOne({ _id: shop_id }, { $set: { userImages: photos } });

    shop.userImages = photos;
  }

  return shop;
};
