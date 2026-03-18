import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  deadline: Date,
  status: {
    type: String,
    enum: ["active", "completed", "onhold"],
    default: "active"
  }
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);