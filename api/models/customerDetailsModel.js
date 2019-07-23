const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const customerDetailsSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primarykey: true
  },
  c_desc: {
    type: String,
    default: ""
  },
  tooltip: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
customerDetailsSchema.plugin(autoIncrement.plugin, "cutomerDetailsHelp");
var cutomerDetails = mongoose.model("cutomerDetails", customerDetailsSchema);

module.exports = mongoose.model("cutomerDetails", customerDetailsSchema);
