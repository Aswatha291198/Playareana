
const City = require('../model/cityModel')

const addCity = async (req, res) => {
    
  try {
    const { name } = req.body

    
    const existingCity = await City.findOne({ name })

    if (existingCity) {
      return res.status(409).send({
        success: false,
        message: 'City already exists'
      })
    }
    const newCity = await City.create(req.body)

    return res.status(201).send({
      success: true,
      message: 'New City Added',
      data: newCity
    })

  } catch (error) {
     return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
}

const  AllCity=async(req,res)=>{
  try {
    const allCity=await City.find()
    
    
    return res.status(201).send({success:true,data:allCity})
    
  } catch (error) {
    return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
}
const updateCity =async(req,res)=>{
  try {
    const editCity=await City.findByIdAndUpdate(req.body.id,req.body.name)
    if(!editCity){
      return res.status(404).send({
        success:false,
        message:"No Data Found"
      })
    }
    return res.status(200).send({
      success:true,
      data:editCity
    })
  } catch (error) {
     return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
}

module.exports = { addCity,AllCity,updateCity }

