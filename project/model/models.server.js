var mongoose = require('mongoose');


var db = mongoose.connect(uri);
module.exports = db;
