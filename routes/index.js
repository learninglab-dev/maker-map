var express = require('express');
var router = express.Router();
var fs = require('fs');
require('dotenv').config();



/* GET home page. */
router.get('/', function(req, res, next) {

  var theJson = fs.readFileSync('./public/javascripts/map-data.json');
  var data = JSON.parse(theJson);

  // console.log(JSON.stringify(data, null, 4));

  res.render('index', { title: 'Maker Map', data: data, apiKey: process.env.GOOGLE_MAPS_API_KEY });

});

module.exports = router;
