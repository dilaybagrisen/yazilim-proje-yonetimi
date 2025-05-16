const mongoose = require("mongoose");
const OrganizerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: String, required: true },
    address: String,
    phone: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Organizer", OrganizerSchema);
