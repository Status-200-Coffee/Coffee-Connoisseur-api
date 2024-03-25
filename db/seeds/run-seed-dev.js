const {
  coffeeShopsNewcastle,
  coffeeShopsCarlisle,
  users,
  cities,
} = require("../data/development-data/index.js");
const seedDb = require("./seed.js");
const { client } = require("../connection.js");

const runSeed = () => {
  return seedDb(
    coffeeShopsNewcastle,
    "Newcastle",
    coffeeShopsCarlisle,
    "Carlisle",
    users,
    cities
  ).then(() => client.close);
};

runSeed();
