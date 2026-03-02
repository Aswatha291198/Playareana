
const express=require("express")
const app=express()
require("dotenv").config();
const connectDB=require('./config/db');
const userRoute = require("./route/userRoute");
const turfRouter = require("./route/turfeRoute");
const gameRouter = require("./route/gameRoute");
const cityRouter = require("./route/cityRoute");
const bookRouter=require('./route/bookRoute')
const rateLimit=require('express-rate-limit')
const helmet=require('helmet')
const path=require('path')

const apiLimit=rateLimit({
    windowMS: 15 * 60 *1000,
    max:100,
    message:'Too many request from this api'
})
const clientBuildPath=path.join(__dirname,'../client/dist')
app.use(express.static(clientBuildPath))
connectDB() 
app.use(express.json())
app.use(helmet())
app.use('/turfo',apiLimit)
app.use('/turfo/user',userRoute)
app.use('/turfo/turfs',turfRouter)
app.use('/turfo/game',gameRouter)
app.use('/turfo/city',cityRouter)
app.use('/turfo/booking',bookRouter)
const port=8082
app.listen(port,()=>{
    console.log(`Server is Running on the http://localhost:${port}`);
    
})