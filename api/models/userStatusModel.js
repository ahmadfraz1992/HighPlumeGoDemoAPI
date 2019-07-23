const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

const db = mongoose.connection;
const userStatusSchema = new mongoose.Schema({
  _id: { type: Number, autoIncrement: true, primaryKey: true },
  user_id: { type: Number, required: true },
  random_No: { type: Number }
});
autoIncrement.initialize(db);
userStatusSchema.plugin(autoIncrement.plugin, "userStatusSchema");
var userStatus = mongoose.model("userStatus", userStatusSchema);
module.exports = userStatus;
