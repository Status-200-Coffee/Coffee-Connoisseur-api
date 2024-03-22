const app = require('../app')
const request = require('supertest')
const {client} = require("../db/connection")
const seedDb = require("../db/seeds/seed")
const {
    coffeeShopsCity1,
    coffeeShopsCity2,
  } = require("../db/data/test-data/index");


beforeEach(() => seedDb(coffeeShopsCity1, "city1", coffeeShopsCity2, "city2"))

describe("", () => {
    test("", () => {

    })
})