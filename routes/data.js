var express = require('express');
var router = express.Router();
var Space = require('../public/models/space.js');


router.get('/', function(req, res, next) {
  res.render('data');
});

router.post('/send', function(req, res) {
  res.send('got your input');
  console.log('got some data');
  console.log(JSON.stringify(req.body, null, 4));

  // var geocode = googleMapsClient.geocode({
  //       address: req.body.address
  //     }, function(err, response) {
  //       if (!err) {
  //         console.log(response.json.results);
  //       }
  //     });

  var newSpace = new Space({
    name: req.body.name,
    address: req.body.address,
    latitute: 0,
    longitude: 0,
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

});

module.exports = router;
