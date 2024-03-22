const dotenv = require('dotenv')
const { MongoClient } = require("mongodb");

dotenv.config()

const client = new MongoClient(process.env.URI);

module.exports = {client}