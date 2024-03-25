const app = require("../app");
const request = require("supertest");
const { client } = require("../db/connection");
const seedDb = require("../db/seeds/seed");
const {
  coffeeShopsCity1,
  coffeeShopsCity2,
} = require("../db/data/test-data/index");
 
beforeEach(() => seedDb(coffeeShopsCity1, "city1", coffeeShopsCity2, "city20"),1000)
afterEach(async () => {
  await client.close();
});

describe("GET /shops/:city", () => {
    test("responds with array of shops from specified city", async () => {
        const response = await request(app.callback()).get("/api/shops/city1");
        const {shops }= response.body;
        expect(response.status).toBe(200);
        expect(shops.length).toBe(6)
        });
      });
      //add error handling tests
      //test for error if city doesn't exists

describe("GET /api/shops/:city/:shop_id", () => {
  test("Status:200 responds with the shop object relating to the correct shop_id", async () => {
    const response = await request(app.callback()).get("/api/shops/city1/3");
    const { shop } = response.body;
    expect(response.status).toBe(200);
    expect(shop).toMatchObject({
      _id: 3,
      name: "shop3",
      longitude: 0,
      latitude: 0,
      city: "city1",
      totalRatings: 64,
      rating: 4.9,
      dogFriendly: true,
      dairyFree: true,
      hasSeating: true,
    });
  });
  test("Status:404 returns an error when a valid but non-existent id is received", async () => {
    const response = await request(app.callback()).get("/api/shops/city1/300");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });
  test("Status:404 returns an error when an invalid id is received", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1/notAnId"
    );
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });
});

