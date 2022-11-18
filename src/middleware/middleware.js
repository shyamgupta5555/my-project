const jwt = require('jsonwebtoken')
const blogModels = require('../models/blogModels')

const authentication = async function(req ,res ,next){
try{
  let token = req.headers['x-auth-token']

  if(!token)return res.status(404).send({msg : "this is  token requied"})
  let decodeedToken = jwt.verify(token ,"function up porject")
  console.log(decodeedToken)
  if(!decodeedToken) return res.status(404).send({msg :"invalid token"})
  req.data = decodeedToken.userId

  next()
}
catch (error) {
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
  //  console.log(blogData.authorId== auth)
   if( blogData.authorId != auth) return res.status(404).send({msg : "this is not match "})
  }
   
  if(authorid!== auth){
    return res.status(403).send({status :false , msg : "not authorized !!!"})
  }
   next()

}
catch (error) {
  res.status(500).send({ error: error.message, msg: "server error" })
}
}

module.exports.authentication= authentication
module.exports.authorization =authorization


