const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const chatMessagesSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  chatInfo_id: {
    type: Number,
    default: ""
  },
  message: {
    type: String,
    default: ""
  },
  dateTime: {
    type: String,
    default: ""
  },

  isUser: {
    type: String,
    default: ""
  },

  isAdminRead: {
    type: Boolean
  }
});
autoIncrement.initialize(db);
chatMessagesSchema.plugin(autoIncrement.plugin, "chatMessagesHelp");
var chatMessages = mongoose.model("chatMessages", chatMessagesSchema);
module.exports = mongoose.model("chatMessages", chatMessagesSchema);
