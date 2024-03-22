const { MongoClient } = require("mongodb");

const dotenv = require('dotenv')
dotenv.config()

const client = new MongoClient(process.env.URI);

module.exports = {client}