module.exports = function (app) {
  var WIDGETS = require("./widget.mock.server.js");

  app.post("/api/page/:pageId/widget",createWidget);
  app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
  app.get("/api/widget/:widgetId",	findWidgetById);
  app.put("/api/widget/:widgetId",	updateWidget);
  app.delete("/api/widget/:widgetId",	deleteWidget);
  app.get("/api/widget", findAllWidgets);

  function findAllWidgets(req, res) {
    res.json(WIDGETS);
  }

  function updateWidget(req, res){
    var userId = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var pageId = req.params['pageId'];
    var widgetId = req.params['widgetId'];
    var newWebSite = req.body;
    for(var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === widgetId) {
        WIDGETS[i] = newWebSite;
        break;
      }
    }
    res.json(getWidgetsForPageId(pageId));
  }

  function findWidgetById(req, res){
    var user = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var pageId = req.params['pageId'];
    var widgetId = req.params['widgetId'];
    res.json(getWidgetById(widgetId));
  }

  function deleteWidget(req, res){
    var user = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var pageId = req.params['pageId'];
    var widgetId = req.params['widgetId'];
    for(var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === widgetId) {
        WIDGETS.splice(i, 1);
        var pages = getWidgetsForPageId(pageId);
        res.json(pages);
        return;
      }
    }
  }

  function createWidget(req, res){
    var user = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var pageId = req.params['pageId'];
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    widget._id = (Math.floor(Math.random() * 100)) + "";
    widget.pageId = pageId;
    widget.text = widget.text;
    widget.url = widget.url;
    widget.size = widget.size;
    widget.width = widget.width;
    WIDGETS.push(widget);
    var pages = getWidgetsForPageId(pageId);
    res.json(pages);
  }

  function findAllWidgetsForPage(req, res){
    var user = req.params['userId'];
    var websiteId = req.params['websiteId'];
    var pageId = req.params['pageId'];
    var widgetId = req.params['widgetId'];
    res.json(getWidgetsForPageId(pageId));
  }

  function  getWidgetsForPageId(pageId) {
    var widgets=[];
    for(var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i].pageId === pageId) {
        widgets.push(WIDGETS[i]);
      }
    }
    return widgets;
  }

  function getWidgetById(widgetId){
    for(var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === widgetId) {
        return WIDGETS[i];
      }
    }
  }
}
