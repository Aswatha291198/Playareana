const User = require('../model/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const Emailhelper = require('../utils/emailHelper');

    const registerUser = async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email }).select('-password')
            if (user) {
                return res.status(409).send({ message: "User Already exists", success: false })
            }
            const salt = 10
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const newUser = await User.create({
                ...req.body,
                password: hashedPassword
            }
            )
            return res.status(201).send({ message: "User created successfully", success: true, data: newUser })
        } catch (error) {
            
            return res.status(500).send({ message: "Something went wrong", success: false })
        }
    }
const loginUser = async (req, res) => {
    try {
         const user = await User.findOne({ email: req.body.email })
    
    const isMatch = await bcrypt.compare(req.body.password, user.password)
   
        const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
            if (!isMatch) {
      return res.status(404).send({ success: false, message: 'Invalid password' })
    }
        return res.status(200).send({ success: true, message: 'Welcome user', data: token })
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong", success: false })
    }
}
const getCurrentUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userid).select('-password')
        if (!currentUser) {
            return res.status(404).send({ message: "User Not Found" })
        }
        return res.status(200).send({ message: 'Welcome User', data: currentUser, success: true })
    } catch (error) {
        return res.status(500).send("something went wrong")
    }
}
const UpdateUser = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.body.id, req.body)
        if (!updateUser) {
            return res.status(404).send("User not found")
        }
        return res.status(200).send({ message: "User updated", success: true, data: updateUser })
    } catch (error) {
        
        return res.status(500).send("something went wrong")
    }
}
const GetAllUser = async (req, res) => {
    try {
        const allUsers=await User.find()
        return res.status(200).send({message:'userlist',success:true,data:allUsers})

    } catch (error) {
       
        return res.status(500).send("something went wrong")
    }
}
const forgetPassword=async(req,res)=>{
    try {
        const {email}=req.body
        if(!email){
            return res.status(404).send({
                success:false,
                message:'Please enter the email for forget password'
            })
        }
        let user=await User.findOne({email:email})
        if(user===null){
            
            
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        else if(user?.otp !== undefined && user.otp<user?.otpExpiry){
            return res.json({
                success:false,
                message:'Please use otp sent on mail'
            })
        }
        const otp=Math.floor(Math.random() * 10000 + 90000)
        user.otp=otp
        user.otpExpiry=Date.now() + 10 * 60  * 1000
        await user.save()
        Emailhelper('otp.html',email,{
            name:user.name,
            otp:user.otp
        })
        return res.send({
            success:true,
            message:'Otp sent successfully'
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:'Something went wrong'
        })
    }
}
const resetPassword= async(req,res)=>{
    try {
        const {password,otp}=req.body
        
    
        if(password===undefined || otp===undefined){
                return  res.status(401).json({
                    success:false,
                    message:'Invalid Request'
                })
        }
        const user=await User.findOne({otp:otp})  
        if(!user){ 
            return res.status(404).send({
                success:false,
                message:'User not found'
            })
        }
        if(Date.now()>user.otpExpiry){
            user.otp=null
            user.otpExpiry=null
            await user.save()
            return res.status(400).json({
                success:false,
                message:'Otp expired'
            })
        }
        user.otp=null
        user.otpExpiry=null
        const hashedPassword=await bcrypt.hash(password,10)
        user.password=hashedPassword
        await user.save()
        return res.send({
            success:true,
            message:'password set successfully'
        })
    } catch (error) {
    
        return res.status(500).send({
            success:false,
            message:error.message
        })
    }
}
module.exports = { loginUser, registerUser, getCurrentUser, UpdateUser,GetAllUser,forgetPassword,resetPassword }