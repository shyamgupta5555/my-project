const jwt = require('jsonwebtoken')
const blogModels = require('../models/blogModels')

const authentication = async function(req ,res ,next){
try{

  let token = req.headers['x-api-key']
  if(!token)return res.status(404).send({msg : "provied the token "})
  
  //  token verfiy
  let decodeedToken = jwt.verify(token ,"function-up porject bloging side")
  if(!decodeedToken) return res.status(404).send({msg :"invalid token"})
  //  authorization  
  req.data = decodeedToken.authorId
  next()

}
catch (error) {
  console.log(error.message)
  res.status(500).send({ error: error.message, msg: "server error" })
}
}


const authorization = async function(req ,res ,next){
  try{
  
  let auth = req.data
  let blogid = req.params.blogid
  let authorid = req.body.authorId

  if(blogid){
   let blogData = await blogModels.findById(blogid)  
  if(!blogData)return res.status(400).send({status: false , msg : "please provid vild blog id "})
  //  authorization check
   if( blogData.authorId != auth) return res.status(404).send({msg : "this is not match "})
  }
   

  // if(authorid!== auth){
  //   return res.status(403).send({status :false , msg : "not authorized !!!"})
  // }
   next()

}
catch (error) {
  console.log(error.message)
  res.status(500).send({ error: error.message, msg: "server error" })
}
}

module.exports.authentication= authentication
module.exports.authorization =authorization


