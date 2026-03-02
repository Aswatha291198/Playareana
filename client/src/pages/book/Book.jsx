import React, { useEffect, useState } from 'react'
import {message, Tabs} from 'antd'
import {hideLoading,showLoading} from '../../../redux/slice/userSlice'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { setCity,setCities,setCityModal } from '../../../redux/slice/citySlice'
import CityModal from '../../component/Modals/CityModal'
import { getAllTurf, getTurfByCity } from '../../api/turf'
import Venue from './Venue'
import './book.css'

const Book = () => {
  const{cities,isCityModal,selectedCity}=useSelector(store=>store.cities)
  const[venues,setVenues]=useState([])
  const[search,setSearch]=useState('')    

  const[serachParams]=useSearchParams()
  const cityFromUrl=serachParams.get('city')
  const dispatch=useDispatch()
  const city=cityFromUrl ?? selectedCity ?? null
  const[book,setBook]=useState(false)

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(search.toLowerCase())
  )

  const getData=async()=>{
    try {
      let response = null
      dispatch(showLoading())
      if(city){    
        dispatch(setCity(city))
        response=await getTurfByCity(city)
        setVenues(response.data)     
      } else {
        response=await getAllTurf()
      }
      if(response.success){
        setVenues(response.data)
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(hideLoading())
    }
  }

  const tabItems=[
    {
      key:'venues',
      label:`Venues ${filteredVenues.length}`,  
      children:<Venue venues={filteredVenues}/>  
    }
  ]

  useEffect(()=>{
    getData()
  },[city])

  return (
    <>
    <main className='flex-c venue-cont'>
      <div className='h-1 d-f-center gap  bor w-color book-cont'>
        <h2 className='font-p b-color'>Book By Venue, Cities</h2>
        <input 
          type="text"
          className='black-border ml-3 bor'
          style={{ width:200, height:40, textAlign:'center' }}
          placeholder='Search By Venue'
          value={search}                
          onChange={(e)=>setSearch(e.target.value)}   
        />
        <div className='border c-p py-3 bor  d-f-center'
          style={{ width:200, height:40 }}
          onClick={()=>{
            dispatch(setCityModal(true))
            setBook(prev=>!prev)
          }}>
          <span className='font-p c-p f-6 ls cap '>{city}</span>
        </div>
      </div>
      <div className='b-top'>
        <div className='b-top'>
          <Tabs 
            items={tabItems} 
            tabBarStyle={{ 
              backgroundColor: 'white',
              padding: '0 30px',
              height: 80,
            }}
          />
        </div>
      </div>
      {isCityModal && <CityModal/>}
    </main>
    </>
  )
}

export default Book