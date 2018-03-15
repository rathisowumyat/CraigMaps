module.exports = function (app) {

  app.get("/api/user/hello", helloUser);
  app.get("/api/user?username=username&password=password", findUserByCredentials);
  app.get("/api/user?username=username", findUserByUsername);
  app.get("/api/user/:userId", findUserById);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.get("/api/user", findUserByCredentials);
  app.post("/api/user", createUser);

  var users = require("./user.mock.server");

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function findUserById(req, res){
    var userId = req.params['userId'];
    var user = users.find(function (user) {
       return user._id === userId;
    });
    res.json(user);
  }

  function findUsers(req, res){
    res.json(users);
  }

  function findUserByCredentials(req, res){
    var username = req.query['username'];
    var password = req.query['password'];
    if (username && password){
      var user = users.find(function (user) {
          return user.username === username && user.password === password;
      });
      if(user) {
        res.json(user);
      } else {
        res.json({});
      }
      return;
    }
    res.json(users);
  }

  function findUserByUsername(req, res){
    var username = req.query['username'];
    var user = null;
    if (username){
      user = users.find(function (user) {
        return user.username === username;
      });
    }
    res.json(user);
  }

  function updateUser(req, res){
    var userId = req.params['userId'];
    var user = req.body;
    for(var i = 0; i < users.length; i++) {
      if (users[i]._id === user._id) {
		users[i].username = user.username;
		users[i].email = user.email;		
        users[i].firstName = user.firstName;
        users[i].lastName = user.lastName;
        res.json(users);
        return;
      }
    }
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users.splice(i, 1);
        res.json(users);
        return;
      }
    }
  }

  function createUser(req, res){
    var user = req.body;
    user._id = (Math.floor(Math.random() * 10)) + "";
    user.firstName = user.username;
    user.lastName = user.username;
    users.push(user);
    res.json(user);
  }
}
