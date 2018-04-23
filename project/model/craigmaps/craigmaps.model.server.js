var mongoose = require('mongoose');
var CraigmapsSchema = require('./craigmaps.schema.server');
var CraigmapsModel = mongoose.model('CraigmapsModel', CraigmapsSchema);

CraigmapsModel.createCraigmaps = createCraigmaps;
CraigmapsModel.findCraigmapsById = findCraigmapsById;
CraigmapsModel.findCraigmapsByCraigmapsname = findCraigmapsByCraigmapsname;
CraigmapsModel.findCraigmapsByCredentials = findCraigmapsByCredentials;
CraigmapsModel.updateCraigmaps = updateCraigmaps;
CraigmapsModel.deleteCraigmaps = deleteCraigmaps;
CraigmapsModel.findCraigmapsByFacebookId = findCraigmapsByFacebookId;

module.exports = CraigmapsModel;

function createCraigmaps(user) {
  return CraigmapsModel.create(user);
}

function findCraigmapsById(userId){
  return CraigmapsModel.findOne({_id: userId});
}

function findCraigmapsByCraigmapsname(username) {
  return CraigmapsModel.findOne({username: username});
}

function findCraigmapsByCredentials(username, password) {
  return CraigmapsModel.findOne({username: username, password: password});
}

function updateCraigmaps(userId, user) {
  return CraigmapsModel.updateOne({_id: userId}, user);
}

function deleteCraigmaps(userId) {
  return CraigmapsModel.deleteOne({_id: userId});
}

function findCraigmapsByFacebookId(facebookId) {
  return CraigmapsModel.findOne({'facebook.id': facebookId});
}
