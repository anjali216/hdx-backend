import Employee from "../models/Employee.js";

export const createEmployee = async (req, res) => {
  const emp = await Employee.create(req.body);
  res.json(emp);
};

export const getEmployees = async (req, res) => {
  const data = await Employee.find();
  res.json(data);
};

export const updateEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
};

export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};