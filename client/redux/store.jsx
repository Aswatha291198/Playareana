import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../redux/slice/userSlice'
import cityReducer from '../redux/slice/citySlice'
const store=configureStore({
    reducer:{
        users:userReducer,
        cities:cityReducer
    }
})
export default store