const app = require('../app')
const request = require('supertest')
const {client} = require("../db/connection")
const seedDb = require("../db/seeds/seed")
const {
    coffeeShopsCity1,
    coffeeShopsCity2,
  } = require("../db/data/test-data/index");

 
beforeEach(() => seedDb(coffeeShopsCity1, "city1", coffeeShopsCity2, "city2"),10000)
afterEach(async () => {
  await client.close();
});

describe("GET /shops/:city", () => {
    test("responds with array of shops from specified city", async () => {
        const response = await request(app.callback()).get("/api/shops/city1");
        const shops = response.body;
        expect(response.status).toBe(200);
        expect(shops.length).toBe(6)
        });
      });
      //add error handling tests
      //test for error if city doesn't exists
      


 