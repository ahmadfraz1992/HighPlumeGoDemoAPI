const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
const db = mongoose.connection;

const sectionInfoSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  section_id: {
    type: Number
  },
  q_id: {
    type: Number
  },
  q_tooltip: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
sectionInfoSchema.plugin(autoIncrement.plugin, "sectionInfo");
var secInfo = mongoose.model("sectionInfo", sectionInfoSchema);
module.exports = mongoose.model("sectionInfo", sectionInfoSchema);
