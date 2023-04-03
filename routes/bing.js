const axios = require('axios');

const bingAPI = (req, res) => {
  axios.get(`http://dev.virtualearth.net/REST/V1/Routes/Walking?${req.params.directionQuery}&du=mi&optimize=distance&optimizeWaypoints=true&key=${process.env.BING}`).then(response => {
    res.send(response.data.resourceSets[0].resources[0].routeLegs.map(wayPoint => new BingDirections(wayPoint)));
  }).catch(error => {
    console.error(error);
    res.send([]);
  });
}

class BingDirections {
  constructor (obj) {
    this.startAddress = obj.startLocation.address;
    this.startName = obj.startLocation.name;
    this.endAddress = obj.endLocation.address;
    this.endName = obj.endLocation.name;
    this.travelDistance = obj.travelDistance;
    this.startCoordinates = obj.actualStart?.coordinates.join(',') ?? '';
    this.endCoordinates = obj.actualEnd?.coordinates.join(',') ?? '';
    this.itineraryItems = obj.itineraryItems
  }
}

module.exports = bingAPI;