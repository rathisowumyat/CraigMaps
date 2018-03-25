module.exports = function(app){
  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);

  var websiteModel = require("../model/website/website.model.server");

  function createWebsite(req, res) {
    var userId = req.params['userId'];
    var website = req.body;
    websiteModel.createWebsiteForUser(userId, website).then(function (website) {
      res.json(website);
    });
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    websiteModel.findAllWebsitesForUser(userId).then(function (websitesForUser) {
      res.json(websitesForUser);
    });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel.findWebsiteById(websiteId).then(function (website) {
      if(website)
        res.json(website);
      else
        res.status(404).send("No website with given id.");
    });
  }

  function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var websiteNew = req.body;

    websiteModel.updateWebsite(websiteId, websiteNew).then(function (response) {
      if(response.n >0 || response.nModified > 0)
        res.json("Website updated");
      else
        res.status(404).send("Website was not updated");
    });
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];

    websiteModel.deleteWebsite(websiteId).then(function (response) {
      if(response.deletedCount > 0)
        res.json("Website deleted");
      else
        res.status(404).send("Website cannot be deleted");
    });
  }
};
