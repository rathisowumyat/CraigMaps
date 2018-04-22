var mongoose = require('mongoose');
var uri;

// if(process.env.NODE_ENV == "prod")
//   uri = process.env.MONGODB_URI;
// else
//   uri = 'mongodb://localhost:27017/craigmaps';
 uri = 'mongodb://heroku_k8jhrs71:h1423c2t0jntre1901gu1fm45l@ds119489.mlab.com:19489/heroku_k8jhrs71'

var db = mongoose.connect(uri);
module.exports = db;
