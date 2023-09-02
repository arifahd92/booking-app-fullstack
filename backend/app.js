const express = require("express")
const cors = require('cors');

const sequelize = require("./connection/connection")

const userRoute = require("./route/userRoute")

const app = express()
app.use(cors())
app.use(express.json())//for handling json data
app.use(express.urlencoded({ extended: true }))//for handling form data 
//it can parse data like name=John&age=30 into an object like { name: 'John', age: '30' }. It can also handle nested structure in case of true
app.use(userRoute)
sequelize.sync().then((result) => {//created schema in modal and sync with that
    //console.log(result)//CREATE TABLE IF NOT EXISTS `products` 
    app.listen(8000, (err) => {
        console.log("listening dynamic-routing at port 8000")

    });
}).catch((err) => {
    console.log(err)
})