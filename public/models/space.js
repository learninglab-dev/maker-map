var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Space = new Schema({
    name: String,
    address: String,
    latitude: Number,
    longitude: Number,
    hours: String,
    website: String,
    tags: []
});

module.exports = mongoose.model('Space', Space);
