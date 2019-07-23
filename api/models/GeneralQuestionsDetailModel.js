const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const GeneralQuestionsDetailSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primarykey: true
  },
  q_id: {
    type: Number
  },
  q_textField: {
    type: String,
    default: ""
  },
  q_textField_values: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
GeneralQuestionsDetailSchema.plugin(
  autoIncrement.plugin,
  "GeneralQuestionsDetailSchema"
);
var GeneralQuestions = mongoose.model(
  "GeneralQuestionsDetailSchema",
  GeneralQuestionsDetailSchema
);
module.exports = mongoose.model(
  "GeneralQuestionsDetail",
  GeneralQuestionsDetailSchema
);
