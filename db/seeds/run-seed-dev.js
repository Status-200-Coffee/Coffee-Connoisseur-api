const devData = require('../data/development-data/index.js')
const seedDb = require("./seed.js")
const {client} = require("../connection.js")

const runSeed = () => {
    return seedDb(devData).then(() => client.close)
}

runSeed()