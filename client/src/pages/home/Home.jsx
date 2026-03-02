import React, { useState } from 'react'
import x from '../../assets/X.png'
import{Select} from 'antd'
import './home.css'
import { CiLocationOn } from "react-icons/ci"
import { getAllCity } from '../../api/city'
import{useDispatch,useSelector}from 'react-redux'
import ground from '../../assets/turf-ground.png'
import { FaSearch } from "react-icons/fa";
import { BsCalendarCheck } from 'react-icons/bs'
import { BsPlayCircle } from 'react-icons/bs'       
import { hideLoading,showLoading,setLocation } from '../../../redux/slice/userSlice'
import { GiSoccerKick } from "react-icons/gi"
const Home = () => {
  const dispatch=useDispatch()
  const[city,SetCity]=useState([])

  return (
    <>
    <main className='flex-c gp-10'>
    <section className='home-sec w-color ' 
    style={{
      height:'600px',
      borderBottomLeftRadius:20
    }}
    > 
    <div className=' home-hero'>
    <h1 className='font-p w-50 py-3 mb b-color '>
      Book sports venues.
Join games.
Find trainers near you.
    </h1>
    <p className='font-p w-50 b-color py-3'>The World’s Largest Sports Community to Book Venues, Find Trainers, and Join Games Near you.</p>
    </div>
    <div className='w-50'>
    <img src={x} alt=""className='h-100 p-left' />
    </div> 
    </section>
    <div className='home-why-section'>
      <div className='why-sec flex-c '>
        <section className='m-20  w-color bor  '>
         <div className=''>
           <section className=''>
            <h1 className='font-s b-color text-center mr-3'>Why Choose Us</h1>
          </section>
          <section className='d-flex w-100'>
           <section className='flex-c gap b-color m-20'>
             <h2 className='font-p py-3'>
              Always Find a Game
            </h2>
            <p className='font-larger b-color font-p py-3'>
              Tired of waiting for friends to be free? With Turfo, there’s always a game happening in your city. Morning, evening, weekday, or weekend, we make sure players are connected so the action never stops.
            </p>
           </section>
          <section className='flex-c gap b-color m-20'>
            <h2 className='font-p py-3 '>Play With Anyone, Anytime</h2>
          <p className='font-large b-color font-p py-3 '>Whether you’re walking in solo or showing up with your crew, whether you're a complete beginner or a self-acclaimed “GOAT,” you’ll always be welcomed. Our community lives on inclusivity; there’s always room for more.</p>
          </section>
          </section>  
         </div>
        </section>
      </div>
    </div>
    <div className='d-f-center'>
      <section className='m-20 w-color bor how-cont w-50'>
        <div className='text-center'>
          <h1 className='font-s  ls b-color mt '>How It Works</h1>
        </div>
        <div className='d-flex justify-content-between m-20'>
          <div className='flex-c mt h-1'>
            <FaSearch
            className='b-color'
             style={{
              fontSize:70,
              position:'relative',
              bottom:10
             }}   
            />
            <span className='font-p f-6 ls font-larger b-color'>Search</span>
          </div>
          <div className='flex-c h-1 '>
            <BsCalendarCheck
            className='b-color'
             style={{
              fontSize:70,

             }}/>
             <span className='font-p f-6 ls font-larger b-color'
             style={{
              position:'relative',
              top:14,
              left:10
             }} 
             >Book</span>
          </div>
          <div className='flex-c'>
           <GiSoccerKick
            className='b-color'
             style={{
              fontSize:70,
             }}
           />
           <span className='font-p f-6 ls font-larger b-color'
           style={{
              position:'relative',
              top:10,
              left:10
             }} 
           >Play</span>
          </div>
        </div>
      </section>

    </div>
    </main>
     </>
  )
}

export default Home