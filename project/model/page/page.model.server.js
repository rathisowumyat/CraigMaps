var mongoose = require('mongoose');
var PageSchema = require('./page.schema.server');
var PageModel = mongoose.model('PageModel', PageSchema);

PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

module.exports = PageModel;

function createPage(websiteId, page) {
  page._website= websiteId;
  return PageModel.create(page);
}

function findAllPagesForWebsite(websiteId){
  return PageModel.find({_website: websiteId});
}

function findPageById(pageId) {
  return PageModel.findOne({_id: pageId});
}

function updatePage(pageId, page) {
  return PageModel.updateOne({_id: pageId}, page);
}

function deletePage(pageId) {
  return PageModel.deleteOne({_id: pageId});
}
