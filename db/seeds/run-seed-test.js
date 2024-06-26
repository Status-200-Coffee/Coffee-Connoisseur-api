const {
  coffeeShopsCity1,
  coffeeShopsCity2,
  users,
  cities,
} = require("../data/test-data/index.js");
const seedDb = require("./seed.js");
const { client } = require("../connection.js");

const runSeed = () => {
  return seedDb(
    coffeeShopsCity1,
    "city1",
    coffeeShopsCity2,
    "city2",
    users,
    cities
  ).then(() => client.close);
};

runSeed();
