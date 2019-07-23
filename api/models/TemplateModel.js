const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const TemplateSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  template_name: {
    type: String,
    default: ""
  },
  template_Type: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
TemplateSchema.plugin(autoIncrement.plugin, "Template");
var Template = mongoose.model("Template", TemplateSchema);

module.exports = mongoose.model("Template", TemplateSchema);
