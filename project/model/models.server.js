var mongoose = require('mongoose');

//var uri = 'mongodb://localhost:27017/craigmaps';
 var uri = 'mongodb://heroku_k8jhrs71:h1423c2t0jntre1901gu1fm45l@ds119489.mlab.com:19489/heroku_k8jhrs71'; //process.env.MONGODB_URI;

var db = mongoose.connect(uri);
module.exports = db;
