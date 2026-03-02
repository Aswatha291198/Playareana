import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { hideLoading, showLoading } from '../../../redux/slice/userSlice'
import { useDispatch } from 'react-redux'
import { getTurfbyId } from '../../api/turf'
import { MdOutlineSportsCricket } from "react-icons/md";
import { BiFootball } from "react-icons/bi";
import { GiTennisBall } from "react-icons/gi";
import { IoBasketballOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import BookModel from './BookModel'
import moment from 'moment'

const SingleTurf = () => {
  const [turf,setTurf]=useState({})
  const params=useParams()
  
  const[isBookModal,setIsBookModal]=useState(false)  
  const {id}=params
  const[booking,setBooking]=useState([])
  const dispatch=useDispatch()
  const sportIconMap = {
    Cricket: <MdOutlineSportsCricket />,
    Football: <BiFootball />,
    Tennis: <GiTennisBall />,
    Basketball: <IoBasketballOutline />,
  };   

  const getData=async()=>{
    try {
      dispatch(showLoading())
      const response= await getTurfbyId(id)
        if(response.success){
          setTurf(response.data)
        }
    } catch (error) {
      error.message(error.message);
      
    }finally{
    dispatch(hideLoading())
    }
  }

  useEffect(()=>{
    getData()
  },[])
  return (
    <>
  <main className='d-flex gap b-top'
  style={{
   minHeight:'100vh',
    backgroundColor:'white'
  }}>
<div className='flex-c ml-3'
  style={{
    width:'70%'
  }}
>
  <section className=' m-20  flex-c'>
  <h1 className='font-p b-color p-left ls'>{turf?.name}</h1>
  
    <span className='p-left  cap font-p f-6 ls b-color mt '>{turf.address}</span>
</section>
<section className='w-100 '>
<div className=' w-100 p-left ml-3'>
  <img src={turf?.poster} alt="x"
  className='bor '
  style={{
    height:500,
    width:'85%'
  }}
   />
</div>
  </section>
  <div>
    <section className='w-100 '>
  <div className='m-20 p-left  '>
    <div className='border-black bor flex-c '
    style={{
      height:200,
      width:'90%'
    }}>
    <div className=''>
      <h3 className='font-p b-color py-3 px-3'>Sports Available</h3>
    </div>
    <div className=' mt '>
      {turf.AddSport?.map((game)=>{
        return(
          <div className='flex-c center ml-3 gp-10'
          style={{
            height:90,
            width:90,
            border:'1px solid rgb(156,184,201)',
            boxShadow:'0px 0px 0px 0px rgb(0,0,0)',
            borderRadius:5
          }}>
           <span
           className='font-large'
           >{sportIconMap[game.name]}</span>
           <span className='font-p f-6 ls font-small'>{game.name}</span>
          </div>
        )
      })}
    </div>
    </div>
  </div>
  </section>
  <section className='flex-c'>
    <div className=' p-left ' >
      <div
      className='border-black bor'
      style={{
      height:200,
      width:'85%',
      position:'relative',
      left:25
    }}>
      <div>
        <h2 className='mt ml-3 font-p b-color ls'>Rules</h2>
        <h3 className='mt ml-3 font-p b-color ls'>{turf.rules} </h3>
      </div>
    </div>
    </div>
  </section>
  </div>
</div>
<div className='ml-3 gap mt'
 style={{
    maxWidth:'400px',
    display:'flex',
    flexDirection:'column'
  }}
>
  <div className='text-center d-f-center c-p '
  style={{
    width:350,
    backgroundColor:'rgb(0,189,78)',
    marginRight:'10px',
 
    height:50,
    borderRadius:'10px',
    color:'white'
  }}
  onClick={()=>setIsBookModal(prev=>!prev)}
  >
    
      <span className='font-p f-6 ls font-large '>Book Now</span>
  </div>
 
 <div className='flex-c g bor '
 style={{
  border:" 2px solid rgba(156, 184, 201, 0.2)"

 }}
 >
 <span className='font-p f-6 font-large ls py-3 px-3'>Address</span>
 <span className='mb-5 font-p font-large ls f-6 px-3 py-3'>  
    {turf.address}
  </span>
 </div>
 <div
 className='flex-c gp-10 bor '
 style={{
  border:" 2px solid rgba(156, 184, 201, 0.2)"

 }}
 > 
   <span className='font-p f-6 font-large ls py-3 px-3'>Location</span>
 <span className='mb-5 font-p font-large ls f-6 px-3 py-3'>  
    {turf?.city?.name}
  </span>
 </div>
 <div
 className='flex-c gp-10 bor '
 style={{
  border:" 2px solid rgba(156, 184, 201, 0.2)"

 }}
 > 
   <span className='font-p f-6 font-large ls py-3 px-3'>Timings</span>
 <span className='mb-5 font-p font-large ls f-6 px-3 py-3'>  
    {turf?.open}-{turf?.close}
  </span>
 </div>
</div>
{isBookModal && <BookModel
isBookModal={isBookModal}
setIsBookModal={setIsBookModal}
turf={turf}
/>

}
  </main>
    </>
  )
}

export default SingleTurf