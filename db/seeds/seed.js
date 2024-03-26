const { client } = require("../connection");

async function seedDb(
  coffeeShopsCity1Data,
  city1,
  coffeeShopsCity2Data,
  city2,
  usersData,
  citiesData
) {
  try {
    await client.connect();

    let dbName = "coffee-conneisseur-api"

    if (process.env.NODE_ENV === "test") {
      dbName += "-test"
    }

    const coffeeShopsCity1Collection = client
      .db(dbName)
      .collection(`coffee-shops-${city1}`);
    const dropCoffeeShopsCity1Collection =
      await coffeeShopsCity1Collection.drop();

    const coffeeShopsCity2Collection = client
      .db(dbName)
      .collection(`coffee-shops-${city2}`);
    const dropCoffeeShopsCity2Collection =
      await coffeeShopsCity2Collection.drop();

    const citiesCollection = client
      .db(dbName)
      .collection("cities");
    const dropCitiesCollection = await citiesCollection.drop();

      const usersCollection = client
      .db(dbName)
      .collection(`users`);
    const dropUsersCollection =
      await usersCollection.drop();

    const seedCoffeeShopsCity1Collection = await client
      .db(dbName)
      .collection(`coffee-shops-${city1}`)
      .insertMany(coffeeShopsCity1Data);

    const seedCoffeeShopsCity2Collection = await client
      .db(dbName)
      .collection(`coffee-shops-${city2}`)
      .insertMany(coffeeShopsCity2Data);


    const seedCitiesCollection = await client
      .db(dbName)
      .collection("cities")
      .insertMany(citiesData);

      const seedUsersCollection = await client
      .db(dbName)
      .collection(`users`)
      .insertMany(usersData);


  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = seedDb;
