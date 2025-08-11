const express = require("express")
const AllRoutes = require("./v1")
const router = express.Router()

router.use("/v1",AllRoutes)

module.exports = router