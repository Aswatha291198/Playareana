const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'users', required: true },
  hasPaid: { type: Boolean, default: false },
  amountPaid: { type: Number, default: 0 },
  transactionId: { type: String },
})

const bookingSchema = new mongoose.Schema({
  turf: { type: mongoose.Schema.Types.ObjectId,
        ref: 'turf',
        required: true
       },
  owner: { type: mongoose.Schema.Types.ObjectId,
           ref: 'users',
           required: true 
        },
  hostedBy: { type: mongoose.Schema.Types.ObjectId,
              ref: 'users',
              required: true },
  bookType: { type: String,
                 enum: ['book', 'host'], 
                 required: true },
  date: { type: Date,
          required: true
         },

  startTime: { type: Number,
               required: true
             },
  endTime: { type: Number,
             required: true
             },
  duration: { type: Number,
              required: true
             },
  totalPrice: { type: Number,
              required: true
            },
  pricePerPlayer: 
                { type: Number

                }, 
            game:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'games'
            },      
  maxPlayers: { type: Number }, 
  players: [playerSchema],
  status: {
    type: String,
    enum: ['open','full','confirmed','cancelled'],
    default: 'confirmed'
  }
}, { timestamps: true })

const Booking = mongoose.model('bookings', bookingSchema)
module.exports = Booking