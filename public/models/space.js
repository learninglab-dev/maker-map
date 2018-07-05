var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Space = new Schema({
    name: String,
    address: String,
    latitute: Number,
    longitude: Number,
    hours: String,
    website: String,
    tags: []
});

module.exports = mongoose.model('Space', Space);
