const { client } = require("../connection");

async function seedDb(
  coffeeShopsCity1Data,
  city1,
  coffeeShopsCity2Data,
  city2,
  users,
  citiesData
) {
  try {
    await client.connect();

    const coffeeShopsCity1Collection = client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city1}`);
    const dropCoffeeShopsCity1Collection =
      await coffeeShopsCity1Collection.drop();

    const coffeeShopsCity2Collection = client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city2}`);
    const dropCoffeeShopsCity2Collection =
      await coffeeShopsCity2Collection.drop();

    const citiesCollection = client
      .db("coffee-conneisseur-api")
      .collection("cities");
    const dropCitiesCollection = await citiesCollection.drop();

    const seedCoffeeShopsCity1Collection = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city1}`)
      .insertMany(coffeeShopsCity1Data);

    const seedCoffeeShopsCity2Collection = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city2}`)
      .insertMany(coffeeShopsCity2Data);

    const seedCitiesCollection = await client
      .db("coffee-conneisseur-api")
      .collection("cities")
      .insertMany(citiesData);
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = seedDb;
