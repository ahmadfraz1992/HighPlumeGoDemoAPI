const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const categorySchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },

  cat_name: {
    type: String,
    default: ""
  },
  cat_Type: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
categorySchema.plugin(autoIncrement.plugin, "categoryHelp");
var category = mongoose.model("category", categorySchema);

module.exports = mongoose.model("category", categorySchema);
