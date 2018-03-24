// Get the dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
// app.use(express.static(path.join(__dirname, 'src')));
app.use('/assets/uploads',express.static(path.join(__dirname, 'src/assets/uploads')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const port = process.env.PORT || '3100';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// MongoDB connection
//var mongoose = require('mongoose');
//var db = mongoose.createConnect('mongodb://localhost:27017/webdev');

require('./assignment/app')(app);

// For Build: Catch all other routes and return the index file -- BUILDING
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'src/index.html'));
// });

//handle GET UR
 var hello = require('./hello');
 hello(app);

server.listen( port , function() {
  console.log('Node app is running on port', app.get('port'))});

