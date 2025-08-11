const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], 
      default: "medium"
    },
    time: {
      type: Date,
      required: true
    }
  },
  { timestamps: true } 
);

const Manager = mongoose.model("Manager", ManagerSchema);
module.exports = Manager;
