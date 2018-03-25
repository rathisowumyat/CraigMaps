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
    pageModel.findPageById(pageId).then(function (page) {
      if(page)
        res.json(page);
      else
        res.status(404).send("No page with given id.");
    });
  }

  function updatePage(req, res) {
    var pageId = req.params['pageId'];
    var pageNew = req.body;
    pageModel.updatePage(pageId, pageNew).then(function (response) {
      if(response.n >0 || response.nModified > 0)
        res.json("Page updated");
      else
        res.status(404).send("Page was not updated");
    });
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    pageModel.deletePage(pageId).then(function (response) {
      if(response.deletedCount > 0)
        res.json("Page deleted");
      else
        res.status(404).send("Page cannot be deleted");
    });
  }
};
