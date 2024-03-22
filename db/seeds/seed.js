const { client } = require("../connection");
const {
  coffeeShopsCity1,
  coffeeShopsCity2,
} = require("../data/test-data/index");

async function seedDb(
  coffeeShopsCity1Data,
  city1,
  coffeeShopsCity2Data,
  city2
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

    const seedCoffeeShopsCity1Collection = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city1}`)
      .insertMany(coffeeShopsCity1Data);

    const seedCoffeeShopsCity2Collection = await client
      .db("coffee-conneisseur-api")
      .collection(`coffee-shops-${city2}`)
      .insertMany(coffeeShopsCity2Data);
  } catch (err) {
    console.log(err.stack);
  }
}

seedDb(coffeeShopsCity1, "city1", coffeeShopsCity2, "city2");
