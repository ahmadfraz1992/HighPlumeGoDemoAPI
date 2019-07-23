const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const generalQuestionRuffInfoSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },

  q_info: {
    type: String,
    default: ""
  },
  q_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
generalQuestionRuffInfoSchema.plugin(
  autoIncrement.plugin,
  "generalQuestionRuffInfoHelp"
);
var generalQuestionRuffInfo = mongoose.model(
  "generalQuestionRuffInfo",
  generalQuestionRuffInfoSchema
);

module.exports = mongoose.model(
  "generalQuestionRuffInfo",
  generalQuestionRuffInfoSchema
);
