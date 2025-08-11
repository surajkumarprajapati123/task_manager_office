const express = require("express")
const { MangerController } = require("../../controllers")
const ManagerAuth = require("../../middleware/mangerAuth")
const router = express.Router()

router.post("/create-task",ManagerAuth,MangerController.CreateTaskByManager)
router.get("/get-task",ManagerAuth,MangerController.getAssignedTask)


module.exports = router

