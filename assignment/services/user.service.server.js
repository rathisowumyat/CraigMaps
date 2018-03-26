module.exports = function (app) {

  app.get("/api/user/hello", helloUser);
  app.get("/api/user?username=username&password=password", findUserByCredentials);
  app.get("/api/user?username=username", findUserByUsername);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.get("/api/user", findUserByCredentials);
  app.post("/api/user", createUser);

  var userModel = require("../model/user/user.model.server");

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
}
