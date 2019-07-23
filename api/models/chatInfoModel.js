const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const chatInfoSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },

  user_email: {
    type: String,
    default: ""
  },
  template_id: {
    type: String,
    default: ""
  },
  section_id: {
    type: String,
    default: ""
  },
  q_id: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
chatInfoSchema.plugin(autoIncrement.plugin, "chatInfoHelp");
var chatInfo = mongoose.model("chatInfo", chatInfoSchema);

module.exports = mongoose.model("chatInfo", chatInfoSchema);
