const{getBookingTurfByDate, makePayment, bookTurf, getBookingsTurfOwner, getAllGroupGames, getBookings, joinGame, getBookingUser}=require('../controllers/bookCont')
const auth = require('../middleware/auth')
const validateRequest = require('../middleware/validateInput')
const router=require('express').Router()


router.post('/getBookingTurfByDate',getBookingTurfByDate)
router.post('/makepayment',auth,makePayment)
router.post('/book-turf',auth,bookTurf)
router.get('/get-all-group-game',getAllGroupGames)
router.get('/incoming-req/:id',getBookingsTurfOwner)
router.get('/getBookings/:id',getBookings)
router.post('/join-game',auth,joinGame)
router.get('/myBookings',auth,getBookingUser)

module.exports=router