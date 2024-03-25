const app = require("../app");
const request = require("supertest");
const { client } = require("../db/connection");
const seedDb = require("../db/seeds/seed");
const {
  coffeeShopsCity1,
  coffeeShopsCity2,
} = require("../db/data/test-data/index");

beforeEach(() => seedDb(coffeeShopsCity1, "city1", coffeeShopsCity2, "city2"));

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

describe("PATCH /api/shops/:city/:shop_id", () => {
  test("Status:200 responds with the shop object with updated rating when a star review is given", async () => {
    const update = { rating: 5 };
    const response = await request(app.callback())
      .patch("/api/shops/city1/2")
      .send(update);
    const { shop } = response.body;
    expect(response.status).toBe(200);
    expect(shop.totalRatings).toBe(4);
    expect(shop.rating).toBe(4.3);
  });
  test("Status:200 responds with the shop object updated with a new photo when an additonal user photo is added", async () => {
    const update = { newPhoto: "testUrl" };
    const response = await request(app.callback())
      .patch("/api/shops/city1/5")
      .send(update);
    const { shop } = response.body;
    expect(response.status).toBe(200);
    expect(shop.userImages.length).toBe(4);
    expect(shop.userImages.includes("testUrl")).toBe(true);
  });
  test("Status:200 can deal with various data types", async () => {
    const update = { rating: "3" };
    const response = await request(app.callback())
      .patch("/api/shops/city1/1")
      .send(update);
    const { shop } = response.body;
    expect(response.status).toBe(200);
    expect(shop.totalRatings).toBe(11);
    expect(shop.rating).toBe(4.4);
  });
  test("Status:404 returns an error when body is malformed/missing properties", async () => {
    const update = {};
    const response = await request(app.callback())
      .patch("/api/shops/city1/2")
      .send(update);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });
  test("Status:404 returns an error when body is valid but shop does not exist", async () => {
    const update = { rating: 5 };
    const response = await request(app.callback())
      .patch("/api/shops/city1/2000")
      .send(update);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });
});
