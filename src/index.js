
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const route = require("./route/route.js")
const app = express()

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://shyamgupta:.T!8NRrzf6FyMYc@cluster0.dbdyccj.mongodb.net/project1-db?retryWrites=true&w=majority",{
   useNewUrlParser :true
})
.then(()=>console.log("mongoDb is connected"))
.catch((err)=>console.log(err))

app.listen(process.env.PORT || 3000,function(){
   console.log("server is running on port"+ " "+ (process.env.PORT || 3000))
})
app.use("/",route)