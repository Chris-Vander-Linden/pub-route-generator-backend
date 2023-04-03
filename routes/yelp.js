const axios = require('axios');

const yelpAPI = (req, res) => {

  const options = {
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    params: {
      location: req.params.location,
      term: 'bar',
      sort_by: 'distance',
      limit: '10'
    },
    headers: {
      accept: 'application/json',
      Authorization: process.env.YELP
    }
  };

  axios
    .request(options)
    .then(response => {
      console.log(response.data.businesses);
      res.send(response.data.businesses.map(business => new YelpBusiness(business)));
    })
    .catch((error) => {
      console.error(error);
      res.send([]);
    });
}

class YelpBusiness {
  constructor (obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.image = obj.image_url
    this.address = obj.location.display_address;
    this.phone = obj.display_phone;
    this.review = obj.url;
    this.coordinates = `${obj.coordinates.latitude}, ${obj.coordinates.longitude}`;
    this.distance = obj.distance;
    this.selected = false;
  }
}

module.exports = yelpAPI;