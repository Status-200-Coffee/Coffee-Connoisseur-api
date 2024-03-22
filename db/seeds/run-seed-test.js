const testData = require('../data/test-data/index.js')
const seedDb = require("./seed.js")
const {client} = require("../connection.js")

const runSeed = () => {
    return seedDb(testData).then(() => client.close)
}

runSeed()