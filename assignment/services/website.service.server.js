module.exports = function(app){
  var WEBSITES = require("./website.mock.server");

  app.post("/api/user/:userId/website",	createWebsite);
  app.get("/api/user/:userId/website",	findAllWebsitesForUser);
  app.get("/api/website/:webId", findWebsiteById);
  app.put("/api/website/:webId",	updateWebsite);
  app.delete("/api/website/:webId",	deleteWebsite);

  function updateWebsite(req, res){
    var userId = req.params['userId'];
    var websiteId = req.params['webId'];
    var newWebSite = req.body;
    for(var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i]._id === websiteId) {
        WEBSITES[i] = newWebSite;
        //res.json(WEBSITES[i]);
        break;
      }
    }
   res.json(getWebsitesForUserId(userId));
  }

  function findWebsiteById(req, res){
    var user = req.params['userId'];
    var websiteId = req.params['webId'];
    res.json(getWebsiteById(websiteId));
  }

  function deleteWebsite(req, res){
    var userId = req.params['userId'];
    var websiteId = req.params['webId'];
    for(var i = 0; i < WEBSITES.length; i++) {
      if (WEBSITES[i]._id === websiteId) {
        WEBSITES.splice(i, 1);
        break;
      }
    }
	var websites = getWebsitesForUserId(userId);
        res.json(websites);
  }

  function createWebsite(req, res){
    var userId = req.params['userId'];
    var website = req.body;
    website._id = (Math.floor(Math.random() * 100)) + "";
    website.developerId = userId;
    WEBSITES.push(website);
    var websites = getWebsitesForUserId(userId);
    res.json(websites);
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    var websites= getWebsitesForUserId(userId);
    res.json(websites);
  }

   function  getWebsitesForUserId(userId) {
     var websites=[];
     for(var i = 0; i < WEBSITES.length; i++) {
       if (WEBSITES[i].developerId === userId) {
         websites.push(WEBSITES[i]);
       }
     }
     return websites;
   }

   function getWebsiteById(websiteId){
     for(var i = 0; i < WEBSITES.length; i++) {
       if (WEBSITES[i]._id === websiteId) {
         return WEBSITES[i];
       }
     }
   }
}


