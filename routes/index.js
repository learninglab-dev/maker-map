var express = require('express');
var router = express.Router();
var fs = require('fs');
require('dotenv').config();
var Space = require('../public/models/space.js');



router.get('/', function(req, res, next) {

  // var theJson = fs.readFileSync('./public/javascripts/map-data.json');
  // var data = JSON.parse(theJson);

  // console.log(JSON.stringify(data, null, 4));

  Space.find({}, function(err, data){
    var spaces = JSON.stringify(data);
    console.log(spaces, null, 4);

  res.render('index', { title: 'Maker Map', data: spaces, apiKey: process.env.GOOGLE_MAPS_API_KEY, mLabKey: process.env.MLAB_API_KEY });
  });

});

module.exports = router;
