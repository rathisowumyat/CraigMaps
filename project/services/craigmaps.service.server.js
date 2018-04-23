module.exports = function (app) {

  app.post("/api/craigmaps/rentals", rental);
  app.post("/api/craigmaps/routes", route);

  var gkey = 'AIzaSyCh83vE6TuJUB6BZswszWjLNwu5LsH-Z3w'; //process.ENV.GKEY;
  var request = require('request');
  var craigslist = require('node-craigslist');
  var client = new craigslist.Client();
  var rp = require('request-promise');

  //Retrieve rentals for the city sorted based rent rate low to high
  function rental(req, res) {
    var city = req.body.from;
    var rent = req.body.rent;
    var rent2 = parseFloat(rent) - 5000;
    rent2 = rent2.toString();
    //console.log(start);
    var options = {
      city: city,
      category: 'hhh',
      offset: 5,
      maxAsk : rent,
      minAsk : rent2
    };

    client
      .search(options, 'rent')
      .then(function(listings) {
        //console.log(listings);
          listings = listings.slice(1,10);
          listings.forEach(function(l) {
            l.location = l.location.toString().replace(/[^a-zA-Z 0-9,]+/g, '');
          });
          // listings.sort(function (a, b) {
          //   var pra = a.price.toString().replace('$', '');
          //   var prb = b.price.toString().replace('$', '');
          //   return parseFloat(pra) - parseFloat(prb);
          // });
          return res.json(listings);
        },
        function(err) {
          console.log('Could not find any rentals for this city');
          return;
        });
  }

  //Draw the routes from each rental to destination
  function httpreqcall(url, callback) {
    //console.log('url:'+url);
    request(url, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.
      //res.json(body);
      //console.log(JSON.stringify(response));
      if (error) {
        console.log('Could not find routes for this house');
        return callback('');
      }
      //console.log(body);
      //var temp = JSON.parse(body);
      callback(body);
    });
  }

  function route(req, res) {
    var l = req.body.list;
    var end = req.body.to;
    var mode = req.body.mode; // req.params['mode'];
    var urlprefix = 'https://maps.googleapis.com/maps/api/directions/json?origin=';
    var urlsuffix = '&destination=' + end + '&mode=' + mode + '&key=' + gkey;
    var distance = '';
    var duration = '';
    var distanceval;
    var durationval;
    //
    // rentallist = JSON.parse(rentallist);
    // rentallist
    //   .forEach(function (l) {
   // var l = JSON.parse(rentallist);
   // console.log(l);
    if (l.location) {
      var url = urlprefix + l.location + urlsuffix;
      //httpreqcall(url, function (temp)
      //console.log(url);
      httpreqcall(url, function (data) {
          var temp = JSON.parse(data);
          //console.log(temp);
          if (temp
              && temp.routes
              && temp.routes[0]
              && temp.routes[0].legs
              && temp.routes[0].legs[0]
              && temp.routes[0].legs[0].duration
              && temp.routes[0].legs[0].duration.value) {
              distance = temp.routes[0].legs[0].distance.text.toString();
              duration = temp.routes[0].legs[0].duration.text.toString();
              distanceval = temp.routes[0].legs[0].distance.value;
              durationval = temp.routes[0].legs[0].duration.value;
              l.distance = distance;
              l.duration = duration;
              l.distanceval = distanceval;
              l.durationval = durationval;
              console.log(distance);
            }

          console.log(duration);
          console.log(distance);
          res.json(l);
        });
    }
  }
  //     });
  //   res.json(rentallist);
  // }

}
