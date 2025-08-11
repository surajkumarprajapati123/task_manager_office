const express = require("express")
const { UserController } = require("../../controllers")
const router = express.Router()

router.post("/create",UserController.RegisterUser)
router.post("/login",UserController.LoginUser)
router.post("/forgate-password",UserController.ForgatePassword)
router.post("/reset-password/:token",UserController.ResetPassword)





module.exports = router

