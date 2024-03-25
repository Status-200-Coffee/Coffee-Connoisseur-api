const { client } = require("../connection");

async function seedDb(
  coffeeShopsCity1Data,
  city1,
  coffeeShopsCity2Data,
  city2,
  usersData
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

      const usersCollection = client
      .db("coffee-conneisseur-api")
      .collection(`users`);
    const dropUsersCollection =
      await usersCollection.drop();

      

    const seedCoffeeShopsCity1Collection = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city1}`)
      .insertMany(coffeeShopsCity1Data);

    const seedCoffeeShopsCity2Collection = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city2}`)
      .insertMany(coffeeShopsCity2Data);

      const seedUsersCollection = await client
      .db("coffee-conneisseur-api")
      .collection(`users`)
      .insertMany(usersData);

  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = seedDb;