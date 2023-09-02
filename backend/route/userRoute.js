const express = require("express")
const { getData, postData, deleteData, updateData } = require("../controller/userController")
const User = require("../model/userModel")

const router = express.Router()

router.get("/", getData)

router.post("/findById", (req, res) => {
    const id = req.body.id
    User.findByPk(id).then((data) => {
        res.json(data)
    })
})

router.post("/postdata", postData)

router.put("/updatedata/:userId", updateData)

router.delete("/deletedata/:userId", deleteData)

module.exports = router

