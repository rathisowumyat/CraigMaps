module.exports = function (app) {

  app.get("/api/craigmaps/:from/:to", calcRoute);
  app.get("/api/craigmaps/:from", calcRent);

  function calcRoute(req, res) {
    var start = req.params['from'];
    var end = req.params['to'];

    console.log(start + end);

    var request = require('request');
    var url = 'https://maps.googleapis.com/maps/api/directions/json?origin='
      + start + '&destination=' + end + '&mode=driving&key=AIzaSyCh83vE6TuJUB6BZswszWjLNwu5LsH-Z3w';
    request(url, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        res.json(body);
      });
  }

  function calcRent(req, res) {
      var start = req.params['from'];

      // console.log(start);
      //
      // var Zillow = require('node-zillow');
      //
      // var zwsid = 'X1-ZWz18nfm3iq77v_2xcn2';
      // var zillow = new Zillow(zwsid);
      // var parameters = {
      //   'zws-id': zwsid,
      //   'address': start,
      //   'citystatezip': '98199',
      //   'rentzestimate': 'true'
      // };

    // var request = require('request');
    // var url = 'https://www.zillow.com/homes/02115_rb/';
    // request(url, function (error, response, body) {
    //   console.log('error:', error); // Print the error if one occurred
    //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //   console.log('body:', body); // Print the HTML for the Google homepage.
    //   res.json(body);
    // });
      //
      // zillow.get('GetSearchResults', parameters)
    // zillow.get('GetRateSummary')
    //     .then(function (results) {
    //       console.log(results);
    //       return res.json(results);
    //       // results here is an object { message: {}, request: {}, response: {}}
    //     });
    var
      craigslist = require('node-craigslist'),
      client = new craigslist.Client({
        city : start
      }),
      options = {
        category : 'apa',
        offset: '20'
        // maxAsk : '200',
        // minAsk : '100'
      };

    client
      .search(options, 'rent')
      .then(function(listings) {
      // play with listings here...
        //console.log(listings);
        listings.forEach(function (l) {
          l.price = l.price.toString().replace('$','');
        });
        listings.sort(function (a, b) {
          return parseFloat(a.price) - parseFloat(b.price);
        });
        return res.json(listings);
      });
  }
}
