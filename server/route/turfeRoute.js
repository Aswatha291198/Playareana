
const { addTurf, updateTurf, deleteTurf, getAllTurf, getTurfById ,getTurfByIdowner, getTurfByCity } = require('../controllers/turfCon')

    const router=require('express').Router()

    router.post('/add-turf',addTurf)
    router.put('/update-turf',updateTurf)
    router.delete('/delete/:id',deleteTurf)
    router.get('/all-turf',getAllTurf)
    router.get('/get-turf-by-city',getTurfByCity    )
    router.get('/turf/owner/:id',getTurfByIdowner)
    router.get('/turf/:id',getTurfById)
    
    module.exports=router