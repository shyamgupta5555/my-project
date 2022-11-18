const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({

    firstName : {
        type :String, 
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    title : {
        type : String,
        enum: ["Mr", "Mrs", "Miss"],
    },
    email : {
        type :String,
        required : true,
        unique: true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    }
})

module.exports = mongoose.model('Author',authorSchema)