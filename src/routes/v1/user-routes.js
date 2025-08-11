const express = require("express")
const { UserController } = require("../../controllers")
const router = express.Router()

router.post("/create",UserController.RegisterUser)



module.exports = router

