const express = require("express")
const router = express.Router()
const userRoute = require("./user-routes")
const managerRoute = require("./manager-routes")



router.use("/auth",userRoute)
router.use("/manager",managerRoute)


module.exports = router