const turf = require('../model/turfModel')
const City=require('../model/cityModel')

const addTurf = async (req, res) => {
    try {
        const newturf = await turf.create(req.body)
        return res.status(200).send({ message: 'Turf Created', success: true, data: newturf })
    } catch (error) {
        return res.status(500).send({
              message:error.message,
              success: false,
        })    
    }
}
const updateTurf = async (req, res) => {    
    try {
        
        const exixtingTurf = await turf.findByIdAndUpdate(req.body.turfId, req.body) 
        if (!exixtingTurf) {
            return res.status(404).send({ message: 'Turf Not Found', success: false })
        }
        return res.status(200).send({ message: "Turf Updated", success: true, data: exixtingTurf })

    } catch (error) {
        return res.status(500).send({
              message:error.message,
              success: false,
        })   
    }
}
const getAllTurf =async(req,res)=>{
    
    try {
        const allturf=await turf.find().populate('city')
        .populate('AddSport')
        .populate('owner')
        res.status(201).send({success:true,data:allturf})
    } catch (error) {
        return res.status(500).send({
              message:error.message,
              success: false,
        })
          
        }
    }

const deleteTurf = async (req, res) => {
    try {
        const deleteTurf = await turf.findByIdAndDelete(req.params.id)
        if(!deleteTurf){
            return res.status(404).send(
                {message:"Not able to delete",
                success:false})
        }
        res.send({
            message: 'deleted',
            success: true,
           
        })
    } catch (error) {
       return res.status(500).send({
              message:error.message,
            success: false,
            data: deleteTurf
        })  
    }
}
const getTurfByIdowner=async(req,res)=>{
    try {
   
        const find=await turf.find({ owner: req.params.id }).populate('city')
        res.send({
            message:'turf',
            success:true,
            data:find
        })
    } catch (error) {
       return res.status(500).send({
              message:error.message,
              success: false,
        })    
    }
}
const getTurfById=async(req,res)=>{
    
    try {
        const turfById=await turf.findById(req.params.id).populate('AddSport')
        .populate('city') 
        res.send({
            success:true,
            data:turfById
        })
        
        
    } catch (error) {
       return res.status(500).send({
              message:error.message,
              success: false,
            
        })
    }
}

const getTurfByCity = async (req, res) => {
  try {
    
    const { city } =req.query

    if (!city) {
      return res.status(400).send({
        success: false,
        message: 'City is required'
      })
    }

    const cityDoc = await City.findOne({
      name: { $regex: `^${city}$`, $options: 'i' }
    })

    if (!cityDoc) {
      return res.status(404).send({
        success: false,
        message: 'City not found'
      })
    }
    const turfs = await turf.find({ city: cityDoc._id })
      .populate('city')
      .populate('owner')
      .populate('AddSport')

    return res.status(200).send({
      success: true,
      data: turfs
    })
  } catch (error) {
    return res.status(500).send({
              message:error.message,
             success: false,
        })
  }
}



module.exports={addTurf,updateTurf,deleteTurf,getTurfByIdowner,getAllTurf,getTurfById,getTurfByCity}