const { client } = require("../db/connection");
const { haversineDistanceBetweenPointsInKm } = require("../utils");

let dbName = "coffee-conneisseur-api";

if (process.env.NODE_ENV === "test") {
  dbName += "-test";
}

exports.findCities = async (lat, long) => {
  try {
    const result = await client
      .db(dbName)
      .collection("cities")
      .find()
      .toArray();

    if (lat && long) {
      const resultWithDistanceProperty = result.map((city) => {
        city.distance = haversineDistanceBetweenPointsInKm(
          lat,
          long,
          city.latitude,
          city.longitude
        );
        return city;
      });
      const resultSortedByDistance = resultWithDistanceProperty.sort(
        (city1, city2) =>
          +city1.distance > +city2.distance
            ? 1
            : +city1.distance < +city2.distance
            ? -1
            : 0
      );
      return resultSortedByDistance[0]
    }

    return result;
  } catch (error) {
    return error;
  }
};
exports.addCity = async (cityData) => {
    const result = await client
      .db(dbName)
      .collection("cities")
      .insertOne(cityData);
const _id = result.insertedId
const city = await client.db(dbName).collection("cities").findOne({_id})
return city
};