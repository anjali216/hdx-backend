import Employee from "../models/Employee.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getDashboardStats = async (req, res) => {
  try {

    // ✅ Total counts
    const totalEmployees = await Employee.countDocuments();
    const totalProjects  = await Project.countDocuments();
    const totalTasks     = await Task.countDocuments();

    // ✅ Task counts by status
    const completedTasks  = await Task.countDocuments({ status: "completed" });
    const pendingTasks    = await Task.countDocuments({ status: "pending" });
    const inprogressTasks = await Task.countDocuments({ status: "inprogress" });

    // ✅ Project counts by status
    const activeProjects    = await Project.countDocuments({ status: "active" });
    const completedProjects = await Project.countDocuments({ status: "completed" });
    const onHoldProjects    = await Project.countDocuments({ status: "on hold" });

    // ✅ Task counts by priority
    const highPriorityTasks   = await Task.countDocuments({ priority: "high" });
    const mediumPriorityTasks = await Task.countDocuments({ priority: "medium" });
    const lowPriorityTasks    = await Task.countDocuments({ priority: "low" });

    // ✅ Recent employees (last 5)
    const recentEmployees = await Employee.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email department role");

    // ✅ Recent projects (last 5)
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title status startDate endDate");

    // ✅ Recent tasks (last 5)
    const recentTasks = await Task.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("assignedTo", "name")
      .populate("project", "title")
      .select("title status priority dueDate");

    res.json({
      // Totals
      totalEmployees,
      totalProjects,
      totalTasks,

      // Task breakdown
      completedTasks,
      pendingTasks,
      inprogressTasks,

      // Project breakdown
      activeProjects,
      completedProjects,
      onHoldProjects,

      // Priority breakdown
      highPriorityTasks,
      mediumPriorityTasks,
      lowPriorityTasks,

      // Recent data
      recentEmployees,
      recentProjects,
      recentTasks,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};