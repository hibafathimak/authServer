const mongoose = require('mongoose')


const  userSchema = new mongoose.Schema({
    id:{
        type:String ,
        unique:true       
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        unique:true
    }
})



const users = mongoose.model("users",userSchema)

module.exports =users