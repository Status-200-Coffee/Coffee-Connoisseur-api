const app = require("../app");
const request = require("supertest");
const { client } = require("../db/connection");
const seedDb = require("../db/seeds/seed");
const {
  coffeeShopsCity1,
  coffeeShopsCity2,
} = require("../db/data/test-data/index");
 
beforeEach(() => seedDb(coffeeShopsCity1, "city1", coffeeShopsCity2, "city2"))
afterEach(async () => {
  await client.close();
});

describe("GET /shops/:city", () => {
    test("responds with array of shops from specified city", async () => {
        const response = await request(app.callback()).get("/api/shops/city1");
        const {shops}= response.body;
        expect(response.status).toBe(200);
        expect(shops.length).toBe(6)
        });
        //error handling
      });
describe("Get/shops/:city filters",()=>{
  test("responds with filtered array of shops based on query :dogFriendly", async () => {
    const response= await request(app.callback())
      .get("/api/shops/city1?dogFriendly=true");
    const { shops: dogFriendlyShops } = response.body;
    expect(response.status).toBe(200);
    expect(dogFriendlyShops.every(shop => shop.dogFriendly)).toBe(true);
    expect(dogFriendlyShops.length).toBe(4)
  })
  test("responds with filtered array of shops based on query :dairyFree", async () => {
    const response= await request(app.callback())
      .get("/api/shops/city1?dairyFree=true");
    const { shops: dairyFreeShops } = response.body;
    expect(response.status).toBe(200);
    expect(dairyFreeShops.every(shop => shop.dairyFree)).toBe(true);
    expect(dairyFreeShops.length).toBe(1)
    expect(dairyFreeShops).toEqual( [{
      _id: 3,
      name: "shop3",
      mainImage: "https://www.barryanddistrictnews.co.uk/resources/images/3329861.jpg?type=mds-article-962",
      userImages: ["https://www.foodandwine.com/thmb/KzfhJG9naqoKK6ubunTvOp1GhiU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Partners-Cortado-FT-BLOG0523-7e4f50be961e4a6490fdfa5a34d6e0f5.jpg","https://abdragons.com/product_images/uploaded_images/depositphotos-43334505-m-2015.jpg","https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipes%2F2020-07-How-to-make-affogato-at-home%2FKitchn_HowTo_Affogato_0281"],
      longitude: 0,
      latitude: 0,
      city: "city1",
      totalRatings: 64,
      rating: 4.9,
      dogFriendly: true,
      dairyFree: true,
      hasSeating: true,
    }])
  })
  test("responds with filtered array of shops based on query :hasSeating", async () => {
    const response= await request(app.callback())
      .get("/api/shops/city1?hasSeating=true");
    const { shops: hasSeatingShops } = response.body;
    expect(response.status).toBe(200);
    expect(hasSeatingShops.every(shop => shop.hasSeating)).toBe(true);
    expect(hasSeatingShops.length).toBe(4)
  });
  test("responds with filtered array of shops based on multiple queries: DogFriendly hasSeating",async () => {
    const response= await request(app.callback())
      .get("/api/shops/city1?dogFriendly=true&hasSeating=true");
    const { shops: filteredShops } = response.body;
    expect(response.status).toBe(200);
    expect(filteredShops.length).toBe(3) 
  })
  test("responds with filtered array of shops based on multiple queries: dairyFree DogFriendly hasSeating", async () => {
    const response= await request(app.callback())
      .get("/api/shops/city1?dairyFree=true&dogFriendly=true&hasSeating=true");
    const { shops: filteredShops } = response.body;
    expect(response.status).toBe(200);
    expect(filteredShops.length).toBe(1)
    expect(filteredShops).toEqual( [{
      _id: 3,
      name: "shop3",
      mainImage: "https://www.barryanddistrictnews.co.uk/resources/images/3329861.jpg?type=mds-article-962",
      userImages: ["https://www.foodandwine.com/thmb/KzfhJG9naqoKK6ubunTvOp1GhiU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Partners-Cortado-FT-BLOG0523-7e4f50be961e4a6490fdfa5a34d6e0f5.jpg","https://abdragons.com/product_images/uploaded_images/depositphotos-43334505-m-2015.jpg","https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipes%2F2020-07-How-to-make-affogato-at-home%2FKitchn_HowTo_Affogato_0281"],
      longitude: 0,
      latitude: 0,
      city: "city1",
      totalRatings: 64,
      rating: 4.9,
      dogFriendly: true,
      dairyFree: true,
      hasSeating: true,
    }])
  })
})
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

