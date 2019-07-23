const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;

const sendEmailSchema = new mongoose.Schema({
  _id: {
    type: Number,
    autoIncrement: true,
    primaryKey: true
  },

  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  type: { type: String, required: true },
  template_id: { type: String, required: true },
  companyName: { type: String, default: "" },
  address: { type: String, required: true },
  phoneNo: { type: String, required: true },
  businessPhoneNo: { type: String, required: true },
  businessAddress: { type: String, required: true },
  email: {
    type: String,
    required: true,
    // unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false }
});
autoIncrement.initialize(db);
sendEmailSchema.plugin(autoIncrement.plugin, "sendEmailSchema");
var sendEmail = mongoose.model("sendEmails", sendEmailSchema);
module.exports = sendEmail;
