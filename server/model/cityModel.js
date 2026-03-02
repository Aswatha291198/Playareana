const mongoose=require('mongoose')

const citySchema=new mongoose.Schema({
    name:{
       type:String,
       required:true,
        
    }
},{timestamp:true})

const cityModal=mongoose.model('city',citySchema)
module.exports=cityModal