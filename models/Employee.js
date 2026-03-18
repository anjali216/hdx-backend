import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  department: String,
  role: String,
  salary: Number,
  joiningDate: Date,
  profileImage: String
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);