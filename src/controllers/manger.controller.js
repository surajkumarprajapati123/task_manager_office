const { ManagerService } = require("../services");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/CatchAsyn");

const CreateTaskByManager = catchAsync(async (req, res) => {
  let manager = await ManagerService.createTaskByManager(req.body, req.user._id);
  ApiResponse(res, 201, `Task  is created Successfully !`, manager);
});

const getAssignedTask = catchAsync(async (req, res) => {
  let manager = await ManagerService.getAssignedTasks();
  ApiResponse(res, 201, `Task  is  assign Successfully !`, manager);
});

const updateTaskDetail = catchAsync(async (req, res) => {
    const taskId = req.params?.id || req.query?.id;
  let manager = await ManagerService.updateTaskDetails(taskId,req.body);
  ApiResponse(res, 201, `Task  Updated Successfully !`, manager);
});

const getTaskDetailById = catchAsync(async (req, res) => {
    const taskId = req.params?.id || req.query?.id;
  let manager = await ManagerService.getTaskById(taskId);
  ApiResponse(res, 201, `Task  get Successfully !`, manager);
});

module.exports = {
  CreateTaskByManager,
  getAssignedTask,
  updateTaskDetail,
  getTaskDetailById
};
