const express = require("express")
const { getData, postData, deleteData, updateData } = require("../backend/connection/controller/userController")
const router = express.Router()

router.get("/", getData)

router.post("/postdata", postData)

router.put("/updatedata/:userId", updateData)

router.delete("/deletedata/:userId", deleteData)

module.exports = router

