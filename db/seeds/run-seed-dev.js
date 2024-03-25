const {
  coffeeShopsNewcastle,
  coffeeShopsCarlisle,
} = require("../data/development-data/index.js");
const seedDb = require("./seed.js");
const { client } = require("../connection.js");

const runSeed = () => {
  return seedDb(
    coffeeShopsNewcastle,
    "Newcastle",
    coffeeShopsCarlisle,
    "Carlisle"
  ).then(() => client.close);
};

runSeed();
