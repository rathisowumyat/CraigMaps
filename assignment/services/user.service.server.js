module.exports = function (app) {

  var passport = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  var bcrypt = require('bcrypt-nodejs');
  var auth = authorized;

  var facebookConfig = {
    clientID     : '2194166917477846', //process.env.FACEBOOK_CLIENT_ID,
    clientSecret : '4fafdf13d72bdba25679f2faa8b110e9', //process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : 'https://cs5610-webdev-app.herokuapp.com/auth/facebook/callback'//, process.env.FACEBOOK_CALLBACK_URL
    //callbackURL  : 'http://localhost:3100/auth/facebook/callback'
  };

  app.get("/api/user/hello", helloUser);
  app.get("/api/user?username=username&password=password", findUserByCredentials);
  app.get("/api/user?username=username", findUserByUsername);
  app.get("/api/user/:userId", findUserById);
  //app.put("/api/user/:userId", updateUser);
  //app.delete("/api/user/:userId", deleteUser);
  app.get("/api/user", findUserByCredentials);
  //app.post("/api/user", createUser);
  app.post("/api/user", auth, createUser);
  app.post("/api/login", passport.authenticate('local'), login);
  app.post("/api/logout", logout);
  app.post("/api/register", register);
  app.get("/api/loggedin", loggedin);
  app.put("/api/user/:userId", auth, updateUser);
  app.delete("/api/user/:userId", auth, deleteUser);
  app.get("/facebook/login", passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    }));


  var userModel = require("../model/user/user.model.server");

  passport.use(new LocalStrategy(localStrategy));
  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
      res.send(401);
    } else {
      next();
    }
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    userModel
      .findUserByUsername(username)
      .then(
        function(user) {
          // if the user exists, compare passwords with bcrypt.compareSync
          if(user && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      );
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }


  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function findUserById(req, res){
    var userId = req.params['userId'];
    userModel
      .findUserById(userId)
      .then(function (user) {
        if(user)
          res.json(user);
        else
          res.status(404).send("No user");
    });
  }

  function findUserByCredentials(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if (username && password) {
      userModel.findUserByCredentials(username, password)
        .then(function (user) {
          if (user) {
            res.json(user);
          } else {
            res.json({});
          }
        });
    }
  }

  function findUserByUsername(req, res){
    var username = req.query['username'];
    var user = null;
    if (username){
      userModel.findUserByUsername(username)
        .then(function (user) {
          res.json(user);
      });
    }
  }

  function updateUser(req, res){
    var userId = req.params['userId'];
    var userNew = req.body;
    userModel.updateUser(userId, userNew)
      .then(function(response){
        res.json(response);
      }, function(err) {
        console.log(err);
        res.sendStatus(500);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    userModel.deleteUser(userId)
      .then(function(response){
        res.json(response);
      }, function(err) {
        console.log(err);
        res.sendStatus(500);
      });
  }

  function createUser(req, res) {
    var user = req.body;
    user.firstName = user.username;
    user.lastName = user.username;
    userModel.createUser(user)
      .then(function (user) {
        res.json(user);
      });
  }

  function register (req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .createUser(user)
      .then(
        function(user){
          if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        }
      );
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then(
        function(user) {
          if(user) {
            return done(null, user);
          } else {
            var names = profile.displayName.split(" ");
            var newFacebookUser = {
              lastName:  names[1],
              firstName: names[0],
              email:     profile.emails ? profile.emails[0].value:"",
              facebook: {
                id:    profile.id,
                token: token
              }
            };
            return userModel.createUser(newFacebookUser);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      )
      .then(
        function(user){
          return done(null, user);
        },
        function(err){
          if (err) { return done(err); }
        }
      );
  }
}
