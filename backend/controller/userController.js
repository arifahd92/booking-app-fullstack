const User = require("../model/userModel")

exports.getData = (req, res, next) => {
    User.findAll().then((detail) => {
        res.json(detail)
    })
}
exports.postData = (req, res, next) => {// these all are named export
    const { name, phone, email } = req.body
    User.create({ name, phone, email }).then((result) => {
        // console.log(result)
        res.redirect("/")//response me hame iska response milega
    }).catch((err) => {
        if (err) {
            res.json({ error: true })//in case if any field is unfilled {error:true} will be sent in respose
        }
    })
}
exports.deleteData = (req, res) => {
    const { userId } = req.params
    console.log(userId)
    User.findByPk(userId).then((data) => {
        data.destroy().then(() => {

            res.redirect("/")
        }).catch(err => {
            console.log(err)
            res.json({ error: true })
        }).catch((err) => {
            res.json({ error: true })
        })
    })
}

exports.updateData = (req, res) => {
    const updateData = req.body
    console.log(updateData)
    const userId = req.params.userId
    console.log({ userId })
    User.findByPk(userId).then((data) => {
        if (!data) {
            return res.status(500).send("user not found")
        }
        data.update(updateData).then((result) => {
            res.redirect("/");
        })
            .catch((error) => {
                return res.status(500).json({ message: "Internal server error iside" });
            });
    }).catch((error) => {
        return res.status(500).json({ message: "Internal server error here" });
    });
}