module.exports = function(app){
  var PAGES = require("./page.mock.server");

  app.post("/api/website/:websiteId/page",	createPage);
  app.get("/api/website/:websiteId/page",	findAllPagesForWebsite);
  app.get("/api/page/:pageId",	findPageById);
  app.put("/api/page/:pageId",	updatePage);
  app.delete("/api/page/:pageId",	deletePage);

  function updatePage(req, res){
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var pageId = req.params['pageId'];
    var newWebSite = req.body;
    for(var i = 0; i < PAGES.length; i++) {
      if (PAGES[i]._id === pageId) {
        PAGES[i] = newWebSite;
        break;
      }
    }
	res.json(getPagesForWebsiteId(websiteId));
  }

  function findPageById(req, res){
    var user = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var pageId = req.params['pageId'];
    res.json(getPageById(pageId));
  }

  function deletePage(req, res){
    var pageId = req.params['pageId'];
    var websiteId = req.params['websiteId'];
    for(var i = 0; i < PAGES.length; i++) {
      if (PAGES[i]._id === pageId) {
        PAGES.splice(i, 1);
        break;
      }
    }
	res.json(getPagesForWebsiteId(websiteId));
  }

  function createPage(req, res){
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var page = req.body;
    page._id = (Math.floor(Math.random() * 100)) + "";
    page.websiteId = websiteId;
    PAGES.push(page);
    var pages = getPagesForWebsiteId(websiteId);
    res.json(pages);
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var websites= getPagesForWebsiteId(websiteId);
    res.json(websites);
  }

   function  getPagesForWebsiteId(websiteId) {
     var pages=[];
     for(var i = 0; i < PAGES.length; i++) {
       if (PAGES[i].websiteId === websiteId) {
         pages.push(PAGES[i]);
       }
     }
     return pages;
   }

   function getPageById(pageId){
     for(var i = 0; i < PAGES.length; i++) {
       if (PAGES[i]._id === pageId) {
         return PAGES[i];
       }
     }
   }
}


