const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
     Location:{
        type:String,
    },
    
    password:{
        type:String,
    },
    Sport:{
        type:[String]
    },
    role:{
        type:String,
        enum:['player','owner','admin'],
        default:'player'

    },
    otp:{
        type:'String'
    },
    otpExpiry:{
        type:Date
    }

    
},{timestamps:true})

const userModel = mongoose.model('users', userSchema);
module.exports=userModel