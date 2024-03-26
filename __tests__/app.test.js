const app = require("../app");
const request = require("supertest");
const { client } = require("../db/connection");
const seedDb = require("../db/seeds/seed");
const {
  coffeeShopsCity1,
  coffeeShopsCity2,
  users,
  cities,
} = require("../db/data/test-data/index");

const { toBeSorted, toBeSortedBy } = require("jest-sorted");
require("jest-sorted");

beforeEach(() =>
  seedDb(coffeeShopsCity1, "city1", coffeeShopsCity2, "city2", users, cities)
);

afterAll(() => {
  return client.close();
});

describe("GET /api/shops/:city", () => {
  test("responds with array of shops from specified city", async () => {
    const response = await request(app.callback()).get("/api/shops/city1");
    const { shops } = response.body;
    expect(response.status).toBe(200);
    expect(shops.length).toBe(6);
  });
  //error handling
});

describe("GET /api/shops/:city filters", () => {
  test("responds with filtered array of shops based on query :dogFriendly", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?dogFriendly=true"
    );
    const { shops: dogFriendlyShops } = response.body;
    expect(response.status).toBe(200);
    expect(dogFriendlyShops.every((shop) => shop.dogFriendly)).toBe(true);
    expect(dogFriendlyShops.length).toBe(4);
  });
  test("responds with filtered array of shops based on query :dairyFree", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?dairyFree=true"
    );
    const { shops: dairyFreeShops } = response.body;
    expect(response.status).toBe(200);
    expect(dairyFreeShops.every((shop) => shop.dairyFree)).toBe(true);
    expect(dairyFreeShops.length).toBe(1);
    expect(dairyFreeShops).toEqual([
      {
        _id: 3,
        name: "shop3",
        mainImage:
          "https://www.barryanddistrictnews.co.uk/resources/images/3329861.jpg?type=mds-article-962",
        userImages: [
          "https://www.foodandwine.com/thmb/KzfhJG9naqoKK6ubunTvOp1GhiU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Partners-Cortado-FT-BLOG0523-7e4f50be961e4a6490fdfa5a34d6e0f5.jpg",
          "https://abdragons.com/product_images/uploaded_images/depositphotos-43334505-m-2015.jpg",
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipes%2F2020-07-How-to-make-affogato-at-home%2FKitchn_HowTo_Affogato_0281",
        ],
        longitude: 3,
        latitude: 1,
        city: "city1",
        totalRatings: 64,
        rating: 4.9,
        dogFriendly: true,
        dairyFree: true,
        hasSeating: true,
      },
    ]);
  });
  test("responds with filtered array of shops based on query :hasSeating", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?hasSeating=true"
    );
    const { shops: hasSeatingShops } = response.body;
    expect(response.status).toBe(200);
    expect(hasSeatingShops.every((shop) => shop.hasSeating)).toBe(true);
    expect(hasSeatingShops.length).toBe(4);
  });
  test("responds with filtered array of shops based on multiple queries: DogFriendly hasSeating", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?dogFriendly=true&hasSeating=true"
    );
    const { shops: filteredShops } = response.body;
    expect(response.status).toBe(200);
    expect(filteredShops.length).toBe(3);
  });
  test("responds with filtered array of shops based on multiple queries: dairyFree DogFriendly hasSeating", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?dairyFree=true&dogFriendly=true&hasSeating=true"
    );
    const { shops: filteredShops } = response.body;
    expect(response.status).toBe(200);
    expect(filteredShops.length).toBe(1);
    expect(filteredShops).toEqual([
      {
        _id: 3,
        name: "shop3",
        mainImage:
          "https://www.barryanddistrictnews.co.uk/resources/images/3329861.jpg?type=mds-article-962",
        userImages: [
          "https://www.foodandwine.com/thmb/KzfhJG9naqoKK6ubunTvOp1GhiU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Partners-Cortado-FT-BLOG0523-7e4f50be961e4a6490fdfa5a34d6e0f5.jpg",
          "https://abdragons.com/product_images/uploaded_images/depositphotos-43334505-m-2015.jpg",
          "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2FPhoto%2FRecipes%2F2020-07-How-to-make-affogato-at-home%2FKitchn_HowTo_Affogato_0281",
        ],
        longitude: 3,
        latitude: 1,
        city: "city1",
        totalRatings: 64,
        rating: 4.9,
        dogFriendly: true,
        dairyFree: true,
        hasSeating: true,
      },
    ]);
  });
  test("responds with array of shops with distance property when passed lat & long query values", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?lat=0&long=0"
    );
    const { shops } = response.body;
    expect(response.status).toBe(200);
    expect(shops.length).toBe(6);
    shops.forEach((shop) => {
      expect(shop).toHaveProperty("distance");
    });
  });
  test("responds with array of shops sorted by distance ascending with passed lat & long query values with sortBy distance", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?lat=0&long=0&sortBy=distance"
    );
    const { shops } = response.body;
    expect(response.status).toBe(200);
    expect(shops.length).toBe(6);
    expect(shops).toBeSortedBy("distance");
  });
});

describe("GET /api/shops/:city order by and sort by", () => {
  test("responds with array of shops sorted by rating, in descending order", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?sortBy=rating&orderBy=desc"
    );
    const { shops } = response.body;
    expect(response.status).toBe(200);
    expect(shops).toBeSortedBy("rating", { descending: true });
  });
  test("responds with array of shops sorted by rating, in ascending order", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?sortBy=rating&orderBy=asc"
    );
    const { shops } = response.body;
    expect(response.status).toBe(200);
    expect(shops).toBeSortedBy("rating", { ascending: true });
  });
  test("sorts by totalRatings", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?sortBy=totalRatings&orderBy=asc"
    );
    const { shops } = response.body;
    expect(response.status).toBe(200);
    expect(shops).toBeSortedBy("totalRatings", { ascending: true });
  });
  test("sorts by distance ascending as default when no sortBy queries passed", async () => {
    const response = await request(app.callback()).get(
      "/api/shops/city1?lat=0&long=0"
    );
    const { shops } = response.body;
    expect(response.status).toBe(200);
    expect(shops).toBeSortedBy("distance", { ascending: true });
  });
});

describe("GET /api/shops/:city/:shop_id", () => {
  test("Status:200 responds with the shop object relating to the correct shop_id", async () => {
    const response = await request(app.callback()).get("/api/shops/city1/3");
    const { shop } = response.body;
    expect(response.status).toBe(200);
    expect(shop).toMatchObject({
      _id: 3,
      name: "shop3",
      longitude: 3,
      latitude: 1,
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
    expect(shop.totalRatings).toBe(3);
    expect(shop.rating).toBe(2.3);
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

describe("GET /api/cities", () => {
  test("Status:200 responds with an array of city objects", async () => {
    const response = await request(app.callback()).get("/api/cities");
    const { cities } = response.body;
    expect(response.status).toBe(200);
    expect(cities.length).toBe(5);
  });
  test("Status:200 responds with closest city when passed long and lat queries", async () => {
    const response = await request(app.callback()).get(
      "/api/cities?lat=59.9783&long=-1.6178"
    );
    const { city } = response.body;
    expect(response.status).toBe(200);
    expect(city).toMatchObject({
      _id: 5,
      city: "city5",
      latitude: 58.9783,
      longitude: -1.6178,
    });
  });
});

describe("GET /api/users", () => {
  test("responds with array of users", async () => {
    const response = await request(app.callback()).get("/api/users");
    const { users } = response.body;
    expect(response.status).toBe(200);
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBe(4);
  });
  //error handling
});

describe("POST /api/users", () => {
  test("Status:201 responds with new user object", async () => {
    const newUser = {
      username: "newUser",
      email: "newUserEmail",
    };
    const response = await request(app.callback())
      .post("/api/users")
      .send(newUser);
    const { user } = response.body;
    expect(response.status).toBe(201);
    expect(user).toMatchObject({
      username: "newUser",
      email: "newUserEmail",
      coffeeCollected: 1,
      photosPosted: [],
      favouriteShops: [],
    });
    expect(user).toHaveProperty("_id");
  });
  test("Status:404 returns an error when username and email keys are missing", async () => {
    const newUser = { username: "testUser" };
    const response = await request(app.callback())
      .post("/api/users")
      .send(newUser);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });
});

describe("PATCH /api/users/:username", () => {
  test("Status:200 responds with updated user object when profile picture is added/changed", async () => {
    const update = { profilePicture: "newProfilePicture" };
    const response = await request(app.callback())
      .patch("/api/users/easter")
      .send(update);
    const { user } = response.body;
    expect(response.status).toBe(200);
    expect(user.profilePicture).toEqual("newProfilePicture");
  });
  test("Status:404 returns an error when profilePicture value is not a string", async () => {
    const update = { profilePicture: 123 };
    const response = await request(app.callback())
      .patch("/api/users/mondayafternoonvibes")
      .send(update);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });
  test("Status:200 responds with updated user object when new photo added", async () => {
    const update = { newPhoto: "newPhotoUrl" };
    const response = await request(app.callback())
      .patch("/api/users/mochamonster")
      .send(update);
    const { user } = response.body;
    expect(response.status).toBe(200);
    expect(user).toEqual({
      _id: 4,
      profilePicture: " imageUrl",
      username: "mochamonster",
      email: "scary@coffee.com",
      coffeeCollected: 5,
      photosPosted: ["newPhotoUrl", "url", "url", "url", "url", "url", "url"],
      favouriteShops: [1, 2, 3, 4, 5],
    });
  });
  test("Status:404 returns an error when newPhoto body is not a string", async () => {
    const update = { newPhoto: 10 };
    const response = await request(app.callback())
      .patch("/api/users/mondayafternoonvibes")
      .send(update);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });
  test("Status:200 responds with updated user object when more coffee collected", async () => {
    const update = { changeCoffee: 1 };
    const response = await request(app.callback())
      .patch("/api/users/easter")
      .send(update);
    const { user } = response.body;
    expect(response.status).toBe(200);
    expect(user).toEqual({
      _id: 3,
      profilePicture: " imageUrl",
      username: "easter",
      email: "cup@coffee.com",
      coffeeCollected: 2,
      photosPosted: ["url"],
      favouriteShops: [],
    });
  });
  test("Status:200 responds with updated user object when coffee collected reset to 0", async () => {
    const update = { changeCoffee: -1 };
    const response = await request(app.callback())
      .patch("/api/users/crazycappuccino123")
      .send(update);
    const { user } = response.body;
    expect(response.status).toBe(200);
    expect(user).toEqual({
      _id: 1,
      profilePicture: " imageUrl",
      username: "crazycappuccino123",
      email: "email@coffee.com",
      coffeeCollected: 0,
      photosPosted: ["url", "url"],
      favouriteShops: [3, 2],
    });
  });
  test("Status:404 returns an error when coffeeCollected value is not 1 or -1", async () => {
    const update = { coffeeCollected: 10 };
    const response = await request(app.callback())
      .patch("/api/users/mondayafternoonvibes")
      .send(update);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });
  test("Status:200 responds with updated user object when shop added to favourites", async () => {
    const update = { addToFavourites: 5 };
    const response = await request(app.callback())
      .patch("/api/users/crazycappuccino123")
      .send(update);
    const { user } = response.body;
    expect(response.status).toBe(200);
    expect(user).toEqual({
      _id: 1,
      profilePicture: " imageUrl",
      username: "crazycappuccino123",
      email: "email@coffee.com",
      coffeeCollected: 9,
      photosPosted: ["url", "url"],
      favouriteShops: [5, 3, 2],
    });
  });
  test("Status:200 responds with updated user object when shop removed from favourites", async () => {
    const update = { removeFromFavourites: 4 };
    const response = await request(app.callback())
      .patch("/api/users/mondayafternoonvibes")
      .send(update);
    const { user } = response.body;
    expect(response.status).toBe(200);
    expect(user).toEqual({
      _id: 2,
      profilePicture: " imageUrl",
      username: "mondayafternoonvibes",
      email: "monday@coffee.com",
      coffeeCollected: 0,
      photosPosted: ["url", "url", "url"],
      favouriteShops: [1],
    });
  });
  test("Status:404 returns an error when invalid request body received", async () => {
    const update = { notAKey: 10 };
    const response = await request(app.callback())
      .patch("/api/users/mondayafternoonvibes")
      .send(update);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });
  test("Status:404 returns an error when a non-existent user is called", async () => {
    const update = { coffeeCollected: 1 };
    const response = await request(app.callback())
      .patch("/api/users/notauser")
      .send(update);
    expect(response.status).toBe(404);
    expect(response.text).toBe("Not Found");
  });
});
  
describe("GET /api/users/:username", () => {
  test("responds with the user object by username", async () => {
    const response = await request(app.callback()).get(`/api/users/easter`);
    const { user } = response.body;
    expect(response.status).toBe(200);
    expect(user).toEqual({
      _id: 3,
      profilePicture: " imageUrl",
      username: "easter",
      email: "cup@coffee.com",
      coffeeCollected: 1,
      photosPosted: ["url"],
      favouriteShops: [],
    });
  });
  test("GET /api/users/:username - User Not Found", async () => {
    const response = await request(app.callback()).get("/api/users/nonexistentuser");
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Failed to find user by username");
  });
})
describe("POST /api/cities", () => {
  test("It should create a new city", async () => {
    const newCityData = {
      city: "Crewe City",
      latitude: 111.456,
      longitude: -777.012,
    };

    const response = await request(app.callback())
      .post("/api/cities")
      .send(newCityData)
      .expect(201);

    const { city } = response.body;
    expect(city.city).toBe(newCityData.city);
    expect(city.latitude).toBe(newCityData.latitude);
    expect(city.longitude).toBe(newCityData.longitude);
  });

  test("It should return 400 if city data is incomplete", async () => {
    const incompleteCityData = {
      city: "Incomplete City",
    };

    const response = await request(app.callback())
      .post("/api/cities")
      .send(incompleteCityData)
      .expect(400);

    expect(response.body.error).toBe("City data is incomplete");
  });
});

describe("POST /api/shops/:city", () => {
  test("It should create a new shop in the specified city", async () => {
    const newShopData = {
      name: "New Coffee Shop",
      address: "123 Main St",
      dogFriendly: "true",
      dairyFree: "false",
      hasSeating: "true",
      lat: "54.12345",
      long: "-1.98765",
      rating: "4.5",
      userImages: "url1,url2,url3",
    };

    const response = await request(app.callback())
    .post("/api/shops/city1")
    .send(newShopData)
    .expect(201);

    const { shop } = response.body;
    expect(shop.name).toBe(newShopData.name);
    expect(shop.address).toBe(newShopData.address);
    expect(shop.dogFriendly).toBe(true);
    expect(shop.dairyFree).toBe(false);
    expect(shop.hasSeating).toBe(true);
    expect(shop.latitude).toBeCloseTo(parseFloat(newShopData.lat));
    expect(shop.longitude).toBeCloseTo(parseFloat(newShopData.long));
    expect(shop.rating).toBeCloseTo(parseFloat(newShopData.rating));
    expect(shop.userImages).toEqual(newShopData.userImages.split(','));
  });

  test("It should return 400 if shop data is incomplete", async () => {
    const incompleteShopData = {
      name: "Incomplete Coffee Shop",
    };

    const response = await request(app.callback())
      .post("/api/shops/city1")  
      .send(incompleteShopData)
      .expect(400);

    expect(response.body.error).toBe("Shop data is incomplete");
  })
})
