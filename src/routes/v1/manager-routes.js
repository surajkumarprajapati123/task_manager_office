const express = require("express")
const { MangerController } = require("../../controllers")
const ManagerAuth = require("../../middleware/mangerAuth")
const router = express.Router()

router.post("/create-task",ManagerAuth,MangerController.CreateTaskByManager)
router.get("/get-task",ManagerAuth,MangerController.getAssignedTask)
router.patch("/update-task",ManagerAuth,MangerController.updateTaskDetail)
router.get("/get",ManagerAuth,MangerController.getTaskDetailById)


module.exports = router

