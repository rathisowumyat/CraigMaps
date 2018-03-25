var mongoose = require('mongoose');
var uri;

// if(process.env.NODE_ENV == "prod")
//   uri = process.env.MONGODB_URI;
// else
//   uri = 'mongodb://localhost:27017/webdev';

uri = 'mongodb://ds123259.mlab.com:23259/heroku_87znt65z/webdev';
// uri = 'mongodb://localhost:27017/webdev';
var db = mongoose.connect(uri);
module.exports = db;
