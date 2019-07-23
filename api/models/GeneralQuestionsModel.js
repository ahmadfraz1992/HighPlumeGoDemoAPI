const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const GeneralQuestionsSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primarykey: true
  },
  q_desc: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
GeneralQuestionsSchema.plugin(autoIncrement.plugin, "GeneralQuestionsSchema");
var GeneralQuestions = mongoose.model(
  "GeneralQuestionsSchema",
  GeneralQuestionsSchema
);
module.exports = mongoose.model("GeneralQuestions", GeneralQuestionsSchema);
