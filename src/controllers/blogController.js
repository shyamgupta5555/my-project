const blogModel = require('../models/blogModels.js')
const authorModel = require('../models/authorModel.js')
const moment = require('moment')
const mongoose= require('mongoose')

//  ============ regex==========

let validation = /^[a-zA-Z0-9]{1,}$/

///// create blogs ==================

const createBlog = async function (req, res) {
  try {

    let data = req.body
    let { title, body, authorId, category, subcategory, tags } = data
    if (Object.keys(data).length === 0) return res.status(400).send({ msg: "please provied all the requierd data" })
    // =================
    if (!title) return res.status(400).send({ status: true, msg: "provid title " })
    if (!validation.test(title)) return res.status(400).send({ status: false, msg: "invalid title" })
    // =================
    if (!body) return res.status(400).send({ status: true, msg: "provid body " })
    if (!validation.test(body)) return res.status(400).send({ status: false, msg: "invalid body" })
    // ================
    if (!authorId) return res.status(400).send({ status: true, msg: "provid authorId " })
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).send({ status: false, msg: "please enter valid author id " })
  }
    // ================
    if (!category) return res.status(400).send({ status: true, msg: " provied category " })
    if (!validation.test(category)) return res.status(400).send({ status: false, msg: "invalid category" })

    // ================
    if (!subcategory) return res.status(400).send({ status: false, msg: "provied subcategori" })
    // ================
    if (!tags) return res.status(400).send({ status: false, msg: "provied tags" })

    //   find author id 
    let check = await authorModel.findById({ _id: authorId })
    if (!check) return res.status(404).send({ msg: "author id is not vaild" })
    //  create blogs
    let createData = await blogModel.create(data)
    res.status(201).send({ data: createData })

  }
  catch (error) {
    console.log(error.message)
    res.status(500).send({ error: error.massage, msg: "error" })
  }
}


///2

const getblogData = async function (req, res) {
  try {

    let data = req.query
    data.isDeleted = false
    data.isPublished = true
    //   find by query blogs 
    let getdata = await blogModel.find(data)
    res.status(200).send({ msg: getdata })
  }
  catch (error) {
    console.log(error.massage)
    res.status(500).send({ error: error.massage, msg: "error" })
  }
}
////3

const update = async function (req, res) {
  try {
    let { title, body, tags, subcategory } = req.body
    let id = req.params.blogid

    // validation
    if (!title) return res.status(400).send({ status: false, msg: "provied title" })
    if (!body) return res.status(400).send({ status: false, msg: "provied body" })
    if (!tags) return res.status(400).send({ status: false, msg: "provied tags" })
    if (!subcategory) return res.status(400).send({ status: false, msg: "provied subcatagori" })

    //  params id validation 

    if (id.length == 0) return res.status(400).send({ status: false, msg: "provied id" })

    //  check vaild blogs id 

    let checkBlogsId = await blogModel.findById(id)
    if (!checkBlogsId) return res.status(400).send({ status: false, msg: "please fill  the vaild id" })

    //  update the blogs

    let update = await blogModel.findOneAndUpdate(
      { _id: id },
      {
        $set: { title: title, body: body, isPublished: true, publishedAt: moment().format("YYYY MM DD") },
        $push: { tags: tags, subcategory: subcategory }
      },
      { new: true }
    )
    if (!update) return res.status(404).send({ status: true })
    res.status(200).send({ status: true, msg: update })

  }
  catch (error) {
    console.log(error.message)
    res.status(500).send({ error: error.message, msg: "server error" })
  }

}
///4

const blogsDeleted = async function (req, res) {
  try {

    let id = req.params.blogid
    if (!id) return res.status(400).send({ msg: " id is not vaild " })
  
    let result = await blogModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: moment().format("YYYY MM DD") } },
      { new: true }
    )

    if (!result) return res.status(404).send({ msg: "this is not match blogID" })
    res.status(200).send({ status: true, data: result })
  }
  catch (error) {
    res.status(500).send({ error: error.message, msg: "server error" })
  }
}


///5

const blogsdetails = async function (req, res) {
  try {

    let data = req.query
    data.isDeleted = false
    let changedelete = await blogModel.updateMany(data, { $set: { isDeleted: true } }, { new: true })

    if (!changedelete) return res.status(404).send({ msg: "data not found " })
    res.status(200).send({ msg: changedelete })
  }
  catch (error) {
    res.status(500).send({ error: error.message, msg: " server error" })
  }
}




module.exports.createBlog = createBlog
module.exports.getblogData = getblogData
module.exports.update = update
module.exports.blogsDeleted = blogsDeleted
module.exports.blogsdetails = blogsdetails
