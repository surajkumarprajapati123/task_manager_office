const { ManagerService } = require("../services");
const ApiResponse = require("../utils/ApiResponse");
const catchAsync = require("../utils/CatchAsyn");

const CreateTaskByManager = catchAsync(async (req, res) => {
  console.log("req.body", req.user);
  let user = await ManagerService.createTaskByManager(req.body, req.user._id);
  ApiResponse(res, 201, `Task  is created Successfully !`, user);
});

const getAssignedTask = catchAsync(async (req, res) => {
  console.log("req.body_______", req.user);
  let user = await ManagerService.getAssignedTasks();
  ApiResponse(res, 201, `Task  is  assign Successfully !`, user);
});

module.exports = {
  CreateTaskByManager,
  getAssignedTask,
};
