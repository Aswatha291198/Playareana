
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
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com", "'unsafe-inline'"],
      connectSrc: ["'self'", "https://api.stripe.com"],
      imgSrc: ["'self'", "data:", "https://5.imimg.com", "https://*.stripe.com"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  })
);
app.use('/turfo',apiLimit)
app.use('/turfo/user',userRoute)
app.use('/turfo/turfs',turfRouter)
app.use('/turfo/game',gameRouter)
app.use('/turfo/city',cityRouter)
app.use('/turfo/booking',bookRouter)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});
const port=8082
app.listen(port,()=>{
    console.log(`Server is Running on the http://localhost:${port}`);
    
})