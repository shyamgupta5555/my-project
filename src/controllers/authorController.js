const authorModel = require('../models/authorModel.js')
const jwt = require('jsonwebtoken')
const validation = require('../validation/validation')




const createAuthor = async function (req, res) {
    try {
        let data = req.body
        console.log(data.password)
        if(!validation.isValidEmail(data.email)) return res.status(400).send({status:false,msg:"invalid emailid"})
        if(!validation.firstName(data.firstName)) return res.status(400).send({status:false,msg:"invalid firstname"})
        if(!validation.lastName(data.lastName)) return res.status(400).send({status:false,msg:"invalid lastname"})
         
        const isValidPassword = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$/)
        if (!isValidPassword.test(data.password)) return res.status(400).send({ status: false, message: "Invalid password" })
        let createData = await authorModel.create(data)
        res.status(201).send({ data: createData })

    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
    
}

const login = async function (req, res, next) {
    try {

        let { password, email } = req.body
        if (password == undefined, email == undefined) return res.status(400).send({ msg: "send password and email  value" })
        let data = await authorModel.findOne({ password: password, email: email })
        if (!data) return res.status(400).send({ msg: "this is not match password and email" })
        let token = jwt.sign(
            {
                userId: data._id.toString(),
                batch: "project-1",
                madeBy: "shyam"
            },
            "function up porject"
        )

        res.setHeader('x-auth-token', token)
        res.status(200).send({ msg: token })
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
}



module.exports.login = login
module.exports.createAuthor = createAuthor