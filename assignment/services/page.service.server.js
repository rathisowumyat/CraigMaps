module.exports = function(app){
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  //var mockdata = require("./mock.data");
  //var pages = mockdata.pages;
  var pageModel = require("../model/page/page.model.server");

  function createPage(req, res) {
    var websiteId = req.params['websiteId'];
    var page = req.body;
    pageModel.createPage(websiteId, page).then(function (page) {
      res.json(page);
    });
  }

  function findAllPagesForWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    pageModel.findAllPagesForWebsite(websiteId).then(function (pagesForWebsite) {
      res.json(pagesForWebsite);
    });
  }

  function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel.findPageById(pageId)
      .then(function (page) {
        res.json(page);
      }, function(err) {
        console.log(err);
        res.sendStatus(500);
      });
  }

  function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var pageNew = req.body;
    pageModel.updatePage(pageId, pageNew)
      .then(function(response){
        res.json(response);
      }, function(err) {
        console.log(err);
        res.sendStatus(500);
      });
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel.deletePage(pageId)
      .then(function(response){
        res.json(response);
      }, function(err) {
        console.log(err);
        res.sendStatus(500);
      });
  }
};
