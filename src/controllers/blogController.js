const blogModel = require('../models/blogModels.js')
const authorModel = require('../models/authorModel.js')
const validation = require('../validation/validation')
const moment = require('moment')
/////1

const createBlog = async function (req, res) {
  try {

    let data = req.body

    if (!validation.title2(data.title)) return res.status(400).send({ status: false, msg: "invalid title" })

    if (!validation.body(data.body)) return res.status(400).send({ status: false, msg: "invalid body" })

    if (!validation.authorId(data.authorId)) return res.status(400).send({ status: false, msg: "invalid authorId" })

    if (!validation.category(data.category)) return res.status(400).send({ status: false, msg: "invalid category" })



    let check = await authorModel.findById({ _id: data.authorId })
    if (!check) return res.status(404).send({ msg: "this is not valid id" })
    let createData = await blogModel.create(data)
    res.status(201).send({ data: createData })

  } catch (error) {
    res.status(500).send({ error: error.massage, msg: "error" })
  }
}


///2

const getblogData = async function (req, res) {
  try {
    let data = req.query
    data.isDeleted = false
    data.isPublished = true
    let getdata = await blogModel.find(data)
    res.status(200).send({ msg: getdata })
  } catch (error) {
    res.status(500).send({ error: error.massage, msg: "error" })
  }
}
////3

const update = async function (req, res) {
  try {
    let { title, body, tags, subcategory } = req.body
    let id = req.params.blogid

    if (id.length == 0) return res.status(400).send({ msg: "this is not  exist id" })

    let update = await blogModel.findOneAndUpdate(
      { _id: id },
      ({
        $set: { title: title, body: body, isPublished: true, publishedAt: moment().format("YYYY MM DD") },
        $push: { tags: tags, subcategory: subcategory }
      }),
      { new: true })


    if (!update) return res.status(404).send({ msg: "this is wrong id" })
    res.status(200).send({ msg: update, status: true })

  } catch (error) {
    res.status(500).send({ error: error.message, msg: "server error" })
  }

}
///4

const blogsDeleted = async function (req, res) {
  try {
    let id = req.params.blogid
    let result = await blogModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: moment().format("YYYY MM DD") } },
      { new: true })

    if (!result) return res.status(404).send({ msg: "this is not match id" })
    res.status(200).send({ status: true, data: result })

  } catch (error) {
    res.status(500).send({ error: error.message, msg: "server error" })
  }
}


///5

const blogsdetails = async function (req, res) {
  try {

    let data = req.query
    let changedelete = await blogModel.updateMany(data, { $set: { isDeleted: true } }, { new: true })
    
    if (!changedelete) return res.status(404).send({ msg: "this is delete key" })
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
