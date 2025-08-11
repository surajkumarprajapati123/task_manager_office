const express = require("express")
const { UserController } = require("../../controllers")
const Auth = require("../../middleware/auth")
const router = express.Router()

router.post("/create",UserController.RegisterUser)
router.post("/login",UserController.LoginUser)
router.post("/forgate-password",UserController.ForgatePassword)
router.post("/reset-password", UserController.ResetPassword);
router.get("/profile", Auth,UserController.GetProfile);





module.exports = router

