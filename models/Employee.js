import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  department: { type: String },
  role: { type: String },
  salary: { type: String },
  joiningDate: { type: String },
  profileImage: { type: String },
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);