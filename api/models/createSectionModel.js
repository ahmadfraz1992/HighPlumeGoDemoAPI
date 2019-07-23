const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const sectionSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  section_name: {
    type: String,
    default: ""
  },
  section_desc: {
    type: String,
    default: ""
  },
  section_isTabular: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
sectionSchema.plugin(autoIncrement.plugin, "section");
var section = mongoose.model("section", sectionSchema);

module.exports = mongoose.model("section", sectionSchema);
