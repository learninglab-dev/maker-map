var express = require('express');
var router = express.Router();
var Space = require('../public/models/space.js');
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GEOCODING_API_KEY,
  Promise: Promise
});


router.get('/', function(req, res, next) {
  res.render('data');
});

router.post('/send', function(req, res) {
  console.log('got some data');
  console.log(JSON.stringify(req.body, null, 4));

  addLocation(req.body);

  res.send('got your input')


    async function addLocation (formData) {
      const geocode = await googleMapsClient.geocode({address: req.body.address})
                                    .asPromise()
                                    .then((response) => {
                                      // console.log('the full response is:' + JSON.stringify(response, null, 4));
                                      console.log('results are: ' + JSON.stringify(response.json.results, null, 4));

                                      var latLng = {
                                                    lat: response.json.results[0].geometry.location.lat,
                                                    lng: response.json.results[0].geometry.location.lng
                                                }
                                      console.log('the coordinates are: ' + latLng.lat + ' , ' + latLng.lng);
                                      return latLng;
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    })

      console.log('here is geocode: ' + JSON.stringify(geocode, null, 4));

        var newSpace = new Space({
          name: req.body.name,
          address: req.body.address,
          latitute: geocode.lat,
          longitude: geocode.lng,
          hours: req.body.hours,
          website: req.body.website,
          tags: [0, 1]
        });

        console.log(JSON.stringify(newSpace, null, 4));

        newSpace.save(function(err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log('saved to DB');
          }
        })

      }


});

module.exports = router;
