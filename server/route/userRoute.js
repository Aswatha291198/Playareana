
const { loginUser, registerUser, getCurrentUser, GetAllUser,forgetPassword, resetPassword } = require("../controllers/userCon")
const auth = require("../middleware/auth")

const userRoute=require("express").Router()

userRoute.post('/login',loginUser)
userRoute.post('/register',registerUser)
userRoute.get('/current',auth,getCurrentUser)
userRoute.post('/forget',forgetPassword)
userRoute.get('/all-users',GetAllUser)
userRoute.post('/reset',resetPassword)

module.exports=userRoute