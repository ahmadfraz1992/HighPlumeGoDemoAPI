const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
const db = mongoose.connection;
const templateInfoSchema = mongoose.Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  template_id: {
    type: Number
  },
  category_id: {
    type: Number
  }
});
autoIncrement.initialize(db);
templateInfoSchema.plugin(autoIncrement.plugin, "templateInfo");
var tempInfo = mongoose.model("templateInfo", templateInfoSchema);
module.exports = mongoose.model("templateInfo", templateInfoSchema);
