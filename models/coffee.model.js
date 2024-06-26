const { client } = require("../db/connection");
const { haversineDistanceBetweenPointsInKm } = require("../utils");

let dbName = "coffee-conneisseur-api";

if (process.env.NODE_ENV === "test") {
  dbName += "-test";
}

exports.findShopsByCity = async (city, filters, sortBy, orderBy = 'asc') => {
  try {
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

    let sortOption = {};

    if (sortBy && orderBy) {
      sortOption[sortBy] = orderBy === "asc" ? 1 : -1;
    }

    const result = await client
      .db(dbName)
      .collection(`coffee-shops-${city}`)
      .find(query)
      .sort(sortOption)
      .toArray();

    if (filters.lat && filters.long) {
      const resultWithDistanceProperty = result.map((shop) => {
        shop.distance = haversineDistanceBetweenPointsInKm(
          filters.lat,
          filters.long,
          shop.latitude,
          shop.longitude
        );
        return shop;
      });
      if (sortBy === "distance" || !sortBy) {
        if (orderBy === "desc") {
          const resultSortedByDistance = resultWithDistanceProperty.sort(
            (shop1, shop2) =>
              shop1.distance < shop2.distance
                ? 1
                : shop1.distance > shop2.distance
                ? -1
                : 0
          );
          return resultSortedByDistance;
        }
        const resultSortedByDistance = resultWithDistanceProperty.sort(
          (shop1, shop2) =>
            shop1.distance > shop2.distance
              ? 1
              : shop1.distance < shop2.distance
              ? -1
              : 0
        );
        return resultSortedByDistance;
      }
      return resultWithDistanceProperty;
    }

    if (!result) {
      throw new Error("No shops found");
    } else {
      return result;
    }
  } catch (error) {
    console.error("Error finding shops:", error);
    throw error;
  }
};

exports.findShopById = async (city, shop_id) => {
  const result = await client
    .db(dbName)
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
  const shop = await client
    .db(dbName)
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
      .db(dbName)
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
      .db(dbName)
      .collection(`coffee-shops-${city}`)
      .updateOne({ _id: shop_id }, { $set: { userImages: photos } });

    shop.userImages = photos;
  }

  return shop;
};
exports.addShopToCity = async (city, shopData) => {
    const result = await client
      .db(dbName)
      .collection(`coffee-shops-${city}`)
      .insertOne(shopData);
const _id = result.insertedId
const shop = await client.db(dbName).collection(`coffee-shops-${city}`).findOne({_id})
return shop
}