const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json())
require("dotenv").config();
const PORT = process.env.PORT || 3002;
const mongoose = require("mongoose");
const BeerModel = require("./Models/routes.js");

const home = require("./routes/home.js");
const yelpAPI = require("./routes/yelp.js");
const bingAPI = require("./routes/bing.js");
const missingPage = require("./routes/missingPage.js");
// const verifyUser = require("./auth.js");
// app.use(verifyUser);
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose is connected");
});

app.get("/", home);
app.get("/yelp/:location", yelpAPI);
app.get("/bingDirections/:directionQuery", bingAPI);
app.get('/dbResults', getBeer);
app.post('/dbResults', postBeer);
app.delete('/dbResults/:id', deleteBeer);


async function deleteBeer(req, res) {
  let id = req.params.id

  try {
    let deleteBeer = await BeerModel.findByIdAndDelete(id);
    res.status(200).send(deleteBeer);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
}


async function postBeer(req, res) {
  console.log(req.body);

  try {
    let createBeer = await BeerModel.create({
      yelpData: req.body.yelpData,
      directions: req.body.directions,
    });
    res.status(200).send(createBeer);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
}

async function getBeer(req, res) {
  try {
    let dbResults = await BeerModel.find({});
    // console.log(catResults);
    res.status(200).send(dbResults);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
}

app.get("*", missingPage);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
