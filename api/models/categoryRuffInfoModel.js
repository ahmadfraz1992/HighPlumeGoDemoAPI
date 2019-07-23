const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const categoryRuffInfoSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },

  cat_info: {
    type: String,
    default: ""
  },
  cat_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
categoryRuffInfoSchema.plugin(autoIncrement.plugin, "categoryRuffInfoHelp");
var categoryRuffInfo = mongoose.model(
  "categoryRuffInfo",
  categoryRuffInfoSchema
);

module.exports = mongoose.model("categoryRuffInfo", categoryRuffInfoSchema);
