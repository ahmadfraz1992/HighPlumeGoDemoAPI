const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

var schema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  file_name: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  }
});

autoIncrement.initialize(db);
schema.plugin(autoIncrement.plugin, "UploadFileHelp");
var files = mongoose.model("files", schema);
module.exports = mongoose.model("files", schema);
