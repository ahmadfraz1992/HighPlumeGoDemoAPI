const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require("fs");
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

var schema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },

  img: {
    type: String,
    required: true
  }
});

autoIncrement.initialize(db);
schema.plugin(autoIncrement.plugin, "UploadImageHelp");
var images = mongoose.model("images", schema);
module.exports = mongoose.model("images", schema);
