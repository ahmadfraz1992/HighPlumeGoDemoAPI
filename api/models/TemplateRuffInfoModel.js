const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const templateRuffInfoSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },

  temp_info: {
    type: String,
    default: ""
  },
  temp_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
templateRuffInfoSchema.plugin(autoIncrement.plugin, "templateRuffInfoHelp");
var templateRuffInfo = mongoose.model(
  "templateRuffInfo",
  templateRuffInfoSchema
);

module.exports = mongoose.model("templateRuffInfo", templateRuffInfoSchema);
