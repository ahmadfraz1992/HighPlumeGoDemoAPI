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

  s_info: {
    type: String,
    default: ""
  },
  s_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
sectionInfoSchema.plugin(autoIncrement.plugin, "sectionRuffInfoHelp");
var sectionRuffInfo = mongoose.model("sectionRuffInfo", sectionInfoSchema);

module.exports = mongoose.model("sectionRuffInfo", sectionInfoSchema);
