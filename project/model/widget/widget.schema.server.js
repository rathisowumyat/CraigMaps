var mongoose = require('mongoose');
var WidgetSchema = mongoose.Schema({
  _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
  type: String,
  name: { type: String, default: "" },
  text: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  description: String,
  url: { type: String, default: "" },
  //width: { type: Number, default: 350 },
  width: { type: String, default: '100%' },
  height: { type: Number, default: 350 },
  rows: { type: Number, default: 0 },
  size: Number,
  class: String,
  icon: String,
  deletable: Boolean,
  formatted: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
  index: Number
}, {collection: 'Widgets'});

module.exports = WidgetSchema;
