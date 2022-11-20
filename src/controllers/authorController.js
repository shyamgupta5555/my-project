const authorModel = require('../models/authorModel.js')
const jwt = require('jsonwebtoken')




// ================== regex ========

let nameRegex = /^[a-zA-Z]{1,30}$/
let emailRegex = /^[a-z0-9_]{3,}@gmail.com$/
let passwordRagex = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/)



// ============================
const createAuthor = async function (req, res) {
    try {

        let data = req.body
        let { fname, lname, title, email, password } = data

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "please provide all the details " })
        }
        // ===============validation check

        if (!fname.length) return res.status(400).send({ status: false, msg: "fill your frist name" })
        fname = data.fname = fname.trim()
        if (!nameRegex.test(fname)) return res.status(400).send({ status: false, msg: "plase vaild fname" })
        // ================
        if (!lname.length) return res.status(400).send({ status: false, msg: "fill your last name" })
        lname = data.lname = lname.trim()
        if (!nameRegex.test(lname)) return res.status(400).send({ status: false, msg: "plase vaild lname" })
        // =============
        if (!title.length) return res.status(400).send({ status: false, msg: "fill your title" })
        if (!nameRegex.test(title)) return res.status(400).send({ status: false, msg: "please vaild title" })
        // ==================
        if (!email) return res.status(400).send({ status: false, msg: "fill your email" })
        if (!emailRegex.test(email)) return res.status(400).send({ status: false, msg: "please vaild email" })
        // ===================
        if (!password) return res.status(400).send({ status: false, msg: "fill your password" })
        if (!passwordRagex.test(password)) return res.status(400).send({ status: false, msg: "please provid vaild password" })
        // ======== create author

        let createData = await authorModel.create(data)
        res.status(201).send({ status: true, data: createData })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ status: false, message: error.message })
    }
}

const login = async function (req, res, next) {
    try {


        let { password, email } = req.body
        if (password == undefined) return res.status(400).send({ status: false, msg: "provid password " })
        if (email == undefined) return res.status(400).send({ status: false, msg: "provid email" })
        //   call data base find author model
        let data = await authorModel.findOne({ password: password, email: email })
        if (!data) return res.status(400).send({ msg: "this not exits vaid user" })
        //     token create 
        let token = jwt.sign(
            {
                authorId: data._id.toString(),
                batch: "project-1",
                madeBy: "shyam"
            },
            "function-up porject bloging side"
        )
        //  set key postmen headers 
        res.setHeader('x-api-key', token)
        res.status(200).send({ status: true, msg: token })
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}



module.exports.login = login
module.exports.createAuthor = createAuthor