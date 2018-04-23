module.exports = function (app){
  require("./services/user.service.server")(app);
  require("./services/website.service.server")(app);
  require("./services/craigmaps.service.server")(app);
  app.get("/api/hello123", hello);
  require("./model/models.server");

  function hello(req, res) {
    console.log("Hello from Root123 context handler");
    //res.send("hello from root context handler");
    res.send({message: "Hello from123 handler in json 123"});
  }
}
