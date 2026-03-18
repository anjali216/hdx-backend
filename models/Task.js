import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  priority: {
    type: String,
    enum: ["high", "medium", "low"]
  },
  dueDate: Date,
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  comments: [String]
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);