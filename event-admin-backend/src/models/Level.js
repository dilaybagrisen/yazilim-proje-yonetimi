const mongoose = require("mongoose");
const LevelSchema = new mongoose.Schema({
  name: String, // örn: “Basic”, “Premium”
  permissions: [String],
});
module.exports = mongoose.model("Level", LevelSchema);
