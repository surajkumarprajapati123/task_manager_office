const express = require("express")
const { UserController } = require("../../controllers")
const router = express.Router()

router.post("/create",UserController.RegisterUser)
router.post("/login",UserController.LoginUser)



module.exports = router

