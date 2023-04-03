'use strict';

console.log('seed the database with data');

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
const BeerModel = require("./models/routes.js");

async function seed() {


  await BeerModel.create({
    yelpData: [{yelp: 'add a beer'}],
    directions: [{directions: 'add a cat'}],
  });
  console.log("Beer me!!");
  await BeerModel.create({
    yelpData: [{yelp2: 'add a beer'}],
    directions: [{directions2: 'add a cat'}],
  });
  console.log("Beer me");
  await BeerModel.create({
    yelpData: [{yelp3: 'add a beer'}],
    directions: [{directions3: 'add a cat'}],
  });
  console.log("Lil Meow Now.");

  console.log("Closing the DB connection for our seed file");
  mongoose.disconnect();
}
//node seed.js

seed();