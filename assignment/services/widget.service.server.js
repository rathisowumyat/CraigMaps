module.exports = function (app) {
  var path = require('path');
  var WIDGETS = require("./widget.mock.server.js");

  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname + '/../uploads' });

  app.post("/api/page/:pageId/widget",createWidget);
  app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
  app.get("/api/widget/:widgetId",	findWidgetById);
  app.put("/api/page/:pageId/widget", reorderWidgets);
  app.put("/api/widget/:widgetId",	updateWidget);
  app.delete("/api/widget/:widgetId",	deleteWidget);
  app.get("/api/widget", findAllWidgets);
  app.post("/api/upload", upload.single('myFile'), uploadImage);
  app.get("/api/image/:imageName", findImage);

  function findImage(req, res) {
    var imageName = req.params['imageName'];
      res.sendFile(path.resolve("./assignment/uploads/" + imageName));
  }

  function findAllWidgets(req, res) {
    res.json(WIDGETS);
  }

  function updateWidget(req, res){
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
   // var pageId = req.params['pageId'];
   var widgetId = req.params['widgetId'];
//   console.log(widgetId+ " " + req.params['wdgId'] +" " + req.params['widgetId']);
    res.json(getWidgetById(widgetId));
  }

  function deleteWidget(req, res){
    var user = req.params['userId'];
    var websiteId = req.params['webId'];
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
    var websiteId = req.params['webId'];
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

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params['pageId'];
    widgetsForPage = getWidgetsForPageId(pageId);
    widgetsForPage = widgetsForPage.sort(function (a,b) {
        return a.index - b.index;
      });
      res.json(widgetsForPage);
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

  function reorderWidgets(req, res){
    var pageId = req.params['pageId'];
    var iIndex = req.query['initial'];
    var fIndex = req.query['final'];

    widgetsForPage = getWidgetsForPageId(pageId);
    widgetsForPage = widgetsForPage.sort(function (a,b) {
      return a.index - b.index;
    });
      if(iIndex < widgetsForPage.length && fIndex < widgetsForPage.length){
        var insertWidget = widgetsForPage[iIndex];
        var inPlaceOf = widgetsForPage[fIndex];
        widgetsForPage.splice(iIndex, 1);
        var insertIndex = widgetsForPage.indexOf(inPlaceOf);
        widgetsForPage.splice(insertIndex, 0, insertWidget);
        saveWidgetOrder(widgetsForPage);
        res.json(widgetsForPage);
      }
      else
        res.status(404).send("Widgets cannot be re-ordered.");
  }

  function saveWidgetOrder(widgetsForPage) {
    var count= widgetsForPage.length;
    for(var i=0; i<count; i++){
      widgetsForPage[i].index = i;
    }
  }

  function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId        = req.body.userId;
    var websiteId     = req.body.websiteId;
    var pageId        = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widget = getWidgetById(widgetId);
    if(!widget) {
      const _idt = (Math.floor(Math.random() * 100)) + "";
      widget =  { _id: _idt, widgetType: "IMAGE", pageId: pageId, width: "100%", "url": filename};
      WIDGETS.push(widget);
    }

    widget.url = filename;
    //console.log(widget.url);
    //console.log("o:"+originalname + " f:" + filename + " p:" + path + " d:" + destination);
    var callbackUrl = 'profile/' + userId + '/websitelist/' + websiteId + '/pagelist/' + pageId + '/widgetlist';

    console.log(callbackUrl);
    res.redirect(callbackUrl);
  }
}
