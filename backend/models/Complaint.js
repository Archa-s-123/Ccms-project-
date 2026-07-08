const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },

  date: {
    type: String,
    default: () => new Date().toLocaleString(),
  },

  image: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);