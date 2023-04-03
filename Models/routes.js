'use strict';

const mongoose = require('mongoose');
const {Schema} = mongoose;

const beerSchema = new Schema({
    yelpData: { type: Array, require: true},
    directions: { type: Array, require: true},
});

const BeerModel = mongoose.model('Bikes-brew', beerSchema);

module.exports = BeerModel;