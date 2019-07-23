const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require("mongoose-auto-increment");
const db = mongoose.connection;

const sectionAnswersSchema = new Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: String,
    default: ""
  },
  template_id: {
    type: String,
    default: ""
    // max: 100000000, // it holds only 9 digits
  },
  cat_id: {
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
  },
  answer: {
    type: String,
    default: ""
  },
  row_id: {
    type: String,
    default: ""
  }
});
autoIncrement.initialize(db);
sectionAnswersSchema.plugin(autoIncrement.plugin, "sectionAnswers");
var secAns = mongoose.model("sectionAnswers", sectionAnswersSchema);
module.exports = mongoose.model("sectionAnswers", sectionAnswersSchema);
