import React from 'react'
import Login from './pages/Login/Login'
import { Routes, Route,Navigate } from 'react-router-dom'
import Register from './pages/register/Register'
import Protected from './component/Protected'
import{Provider} from 'react-redux'
import store from '../redux/store'
import './App.css'
import Admin from './pages/admin/index'
import Home from './pages/home/Home'
import Play from './pages/play/Play'
import Book from './pages/book/Book'
import Owner from './pages/partner'
import UserProfile from './pages/user/UserProfile'
import SingleTurf from './pages/Bookings/SingleTurf'
import Bookings from './pages/user/Bookings/Bookings'
import SingelGame from './pages/Bookings/SingelGame'
import Incoming from './pages/partner/Incoming'
import Forget from './pages/Forget'
import Reset from './pages/Reset/Reset'

const App = () => {
    return (
        <>
        <Provider store={store}>
            <Routes>
                 <Route path='/' element={<Protected><Home/></Protected>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/forget' element={<Forget/>}></Route>
                <Route path='/reset' element={<Reset/>}></Route>
                <Route path='/play' element={<Protected><Play/></Protected>}></Route>
                <Route path='/book' element={<Protected><Book/></Protected>}></Route>
                <Route path='/admin' element={<Protected><Admin/></Protected>}></Route>
                <Route path='/turf/:id' element={<Protected><SingleTurf/></Protected>}></Route>
                <Route path ='/player' element={<Protected><UserProfile/></Protected>}></Route>
                <Route path='/owner' element={<Protected><Owner/></Protected>}></Route>
                <Route path='/incoming-req' element={<Protected><Incoming/></Protected>}></Route>
                <Route path='/myBookings' element={<Protected><Bookings/></Protected>}></Route>
                <Route path='/join-game/:id'element={<Protected><SingelGame/></Protected>}></Route>
            </Routes>      
        </Provider>
            
        </>
    )
}

export default App