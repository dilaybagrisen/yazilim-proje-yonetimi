const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  avatarUrl: String,
});
module.exports = mongoose.model("Profile", ProfileSchema);
