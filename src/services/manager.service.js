const { UserModel, TaskModel } = require("../modles");
const AppError = require("../utils/AppError");

const createTaskByManager = async (taskData, managerId) => {
  const { title, description, assignedTo, priority, deadline } = taskData;

  // Check manager exists and has proper role
  const managerExists = await UserModel.findOne({
    _id: managerId,
    role: "manager",
  });
  console.log("managerExists",managerExists)
  if (!managerExists) throw new AppError("Manager not found", 404);

  if (!Array.isArray(assignedTo) || assignedTo.length === 0) {
    throw new AppError("AssignedTo must be a non-empty array", 400);
  }

  if (!deadline || isNaN(new Date(deadline).getTime())) {
    throw new AppError("Valid deadline is required", 400);
  }

  return await TaskModel.create({
    title,
    description,
    assignedTo,
    assignedBy: managerId,
    priority,
    deadline,
  });
};

const getAssignedTasks = async () => {
  return await TaskModel.find()
    .populate("assignedTo", "name email")
    .populate("assignedBy", "name email");
};

const updateTaskDetails = async (taskId, updateData) => {
  const { priority, deadline } = updateData;

  if (!priority && !deadline) {
    throw new AppError("At least priority or deadline must be provided", 400);
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(
    taskId,
    {
      ...(priority && { priority }),
      ...(deadline && { deadline }),
    },
    { new: true }
  )
    .populate("assignedTo", "name email")
    .populate("assignedBy", "name email");

  if (!updatedTask) throw new AppError("Task not found", 404);

  return updatedTask;
};

const getTaskById = async(id)=>{
  const task = await TaskModel.findById({_id:id})
  if (!task) throw new AppError("Task not found", 404);
  return task
}

module.exports = {
  createTaskByManager,
  getAssignedTasks,
  updateTaskDetails,
  getTaskById
};
