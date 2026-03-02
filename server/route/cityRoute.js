const{addCity, AllCity, updateCity}=require('../controllers/cityCont')

const cityRouter=require('express').Router()

cityRouter.post('/add-city',addCity)
cityRouter.get('/all-city',AllCity)
cityRouter.post('/update-city',updateCity)


module.exports=cityRouter