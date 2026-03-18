import express from "express";
const router = express.Router();

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import { protect } from "../middleware/authMiddleware.js";

router.get("/", protect, getEmployees);
router.post("/", protect, createEmployee);
router.put("/:id", protect, updateEmployee);
router.delete("/:id", protect, deleteEmployee);

export default router;