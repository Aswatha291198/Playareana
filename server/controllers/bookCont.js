const mongoose=require('mongoose')
const Booking=require('../model/BookModel')
const stripe=require('stripe')(process.env.STRIPE_KEY)
const User=require('../model/userModel')
const turf=require('../model/turfModel')
const Games=require('../model/gameModel')
const moment=require('moment')
const Emailhelper = require('../utils/emailHelper')
const makePayment = async (req, res) => {
  try {
    const { amount } = req.body;
      const userId=req.userid
    if (!amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "amount and userId are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let stripeCustomer;

    const existing = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (Array.isArray(existing?.data) && existing.data.length > 0) {
      stripeCustomer = existing.data[0];
    } else {
      stripeCustomer = await stripe.customers.create({
        name: user.name || "Playarena User",
        email: user.email,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      customer: stripeCustomer.id,
      automatic_payment_methods: { enabled: true },
      receipt_email: user.email,
    });

    return res.status(200).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });

  } catch (error) {
     return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
};


const getBookingTurfByDate = async (req, res) => {
  try {
    const { turf, date } = req.body;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const bookings = await Booking.find({
      turf,                          
      date: {
        $gte: startOfDay,            
        $lte: endOfDay,            
      },
    });
  
    return res.status(200).json({
      success: true,
      data: bookings,
    });

  } catch (error) {
     return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
};

const bookTurf = async (req, res) => {
  try {
    const{bookType,transactionId, ...rest}=req.body  
    const newBooking=await Booking.create({
      ...rest,
      bookType,
      status:bookType==='book'?'confirmed':'open',
      players:[{
        user:req.userid,
        hasPaid:true,
        amountPaid:bookType==='book'?rest.totalPrice:rest.pricePerplayer
      }]
    })
    const populateBooking=await Booking.findById(newBooking._id).populate({
      path:'players',
      populate:[{
        path:'user'
      }]
    })
    .populate('game')
    .populate('hostedBy')
    .populate('turf')
    res.status(200).json({
      success: true,
      message: 'Booking created successfully',
      data:populateBooking
    })

  } catch (error) {
     return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
}
  const getBookingsTurfOwner=async(req,res)=>{
  try {
    const{id}=req.params    
    const ownerBooking=await Booking.find({owner:id}).populate('turf')
   
    
    return res.send({
      data:ownerBooking,
      success:true
    })
  } catch (error) {
    return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
}
const getAllGroupGames=async(req,res)=>{
  try {
    const {city,game,date}=req.query
    const now=moment()
    const today=moment().startOf('day')
    const gameDate=moment(date)
    
    const gameName=await Games.find({name:game})
    const booking=await Booking.find({status:'open',
      date:date?{
         $gte: moment(date).startOf('day').toDate(),
        $lte: moment(date).endOf('day').toDate()
      }:{
          $gte:today.toDate()
      }
    })
    .populate({
      path:'turf',
      populate:[
        {path:'city',select:'name'}
      ]
    })
    .populate('game')
    .populate('hostedBy')
    const filtered=booking.filter((b)=>{
      const cityMatch= b.turf.city.name.trim().toLowerCase()===city.trim().toLowerCase()
    const gameMatch=b?.game?.name===game
    
        if(!game){
          return cityMatch 
        }
        else{
   
          return cityMatch && gameMatch
        }
    })
    
    res.send({
      success:true,
      data:filtered
    })
  } catch (error) {
     return res.status(500).send({
              message:error.message,
              success: false,
        })  
    
  }
}

const getBookings=async(req,res)=>{
  try {
    const{id}=req.params
    const booking=await Booking.findById(id).populate({
      path:'turf',
      populate:[{
        path:'city'
      },
    ]
    })
    .populate('game')
    .populate('hostedBy')
    .populate('players.user')
    
    res.send({
      success:true,
      data:booking
    })
  } catch (error) {
    return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
}
const joinGame=async(req,res)=>{
  try {
    const {id,transactionId} =req.body
    const userId=req.userid

    const bookGame=await Booking.findById(id).populate('players.user')
    .populate('hostedBy')
    if(!bookGame){
    return   res.status(404).send({
        success:false,
        message:'No bookings found'
      })
    }
    const alreadyJoined=bookGame.players.some((p)=>{
     return  p.user._id.toString()===req.userid.toString()
    })
    
    if(alreadyJoined){
      return res.status(400).send({
        success:false,
        message:'Already Joined'})
    }
    if(bookGame.players.length===bookGame.maxPlayers){
      bookGame.status='full'
      await bookGame.save()
    }
    if(bookGame.players.length >= bookGame.maxPlayers){
      return res.send({
        success:false,
        message:'Game full'
      })
    }
    bookGame.players.push({
      user:req.userid,
      hasPaid:true,
      amountPaid:bookGame.pricePerPlayer,
      transactionId,
    })
    await bookGame.save()
    await Emailhelper('join.html',bookGame.hostedBy.email,{
      name:bookGame.hostedBy.name,
      user:req.userid
    })
    return res.status(200).send({
      success:true,
      message:'Joined Successfully',
      data:bookGame
    })

  } catch (error) {
     return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
}
const getBookingUser=async(req,res)=>{
  try {
    const id=req.userid
    const  userBooking=await Booking.find({hostedBy:id}).populate({
      path:'turf',
      populate:[{
        path:'city'
      }]
    }).populate('hostedBy','-password')
    .populate('players.user','-password -email')
    .populate('game')
     const joinedBookings = await Booking.find({ 
      'players.user': id,  
      hostedBy: { $ne: id } 
    })
      .populate({ path: 'turf', populate: [{ path: 'city' }] })
      .populate('hostedBy', '-password')
      .populate('players.user', '-password -email')
      .populate('game')

    return res.status(200).send({
      success:true,
      data:{
        userBooking,
        joinedBookings
      } 
    })
  
  } catch (error) {
     return res.status(500).send({
              message:error.message,
              success: false,
        })  
  }
}
module.exports={
  getBookingTurfByDate,
  makePayment,
  bookTurf,
  getBookingsTurfOwner,
  getAllGroupGames,
  getBookings,
  joinGame,
  getBookingUser
}