const app = require("../app");
const request = require("supertest");
const { client } = require("../db/connection");
const seedDb = require("../db/seeds/seed");
const {
  coffeeShopsCity1,
  coffeeShopsCity2,
} = require("../db/data/test-data/index");
const { toBeSorted, toBeSortedBy } = require("jest-sorted");

 
beforeEach(() => seedDb(coffeeShopsCity1, "city1", coffeeShopsCity2, "city2"))
afterEach(async () => {
  await client.close();
});

describe("GET /api/shops/:city", () => {
    test("responds with array of shops from specified city", async () => {
        const response = await request(app.callback()).get("/api/shops/city1");
        const {shops}= response.body;
        expect(response.status).toBe(200);
        expect(shops.length).toBe(6)
        });
        //error handling
      });
describe("Get/api/shops/:city filters",()=>{
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
describe("Get /api/shops/:city order by and sort by", () => {
  test("responds with array of shops sorted by rating, in descending order", async () => {
    const response = await request(app.callback()).get("/api/shops/city1?sortBy=rating&orderBy=desc");
    const { shops } = response.body;
    expect(response.status).toBe(200);
    expect(shops).toBeSortedBy("rating", { descending: true });
  });

  test("responds with array of shops sorted by rating, in ascending order", async () => {
    const response = await request(app.callback()).get("/api/shops/city1?sortBy=rating&orderBy=asc");
    const { shops } = response.body;
    expect(response.status).toBe(200);
    expect(shops).toBeSortedBy("rating", { ascending: true });
  });
  test("sorts by totalRatings", async () => {
    const response = await request(app.callback()).get("/api/shops/city1?sortBy=totalRatings&orderBy=asc");
    const { shops } = response.body;
    expect(response.status).toBe(200);
    console.log(shops)
    expect(shops).toBeSortedBy("totalRatings", { ascending: true });
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

