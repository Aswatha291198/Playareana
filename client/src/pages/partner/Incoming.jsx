import React, { useEffect, useState } from 'react'
import {message, Table} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading,hideLoading } from '../../../redux/slice/userSlice'
import { getBookingsTurfOwner } from '../../api/book'
const Incoming = () => {

const dispatch=useDispatch()
const{user}=useSelector(store=>store.users)
const[booking,setBooking]=useState(null)

const getData=async()=>{
try {
    dispatch(showLoading())
    
    
    const response=await getBookingsTurfOwner(user?._id)
    if(response.success){    
        setBooking(response.data)
    }
} catch (error) {
   message.error(error.message)
    
}finally{
    dispatch(hideLoading())
}
}
useEffect(()=>{
if(user?._id){
    getData()
}
},[user?._id])

const tabItems=[
    {
        key:'name',
        title:'Turf Name',
        dataIndex:'name',
        render:(text,data)=>(
            <span className='f-6 font-p ls'>{data?.turf?.name}</span>
        )
    },
     {
        key:'price',
        title:'Price',
        dataIndex:'totalPrice'
    },
     {
        key:'startime',
        title:' Start Time',
        dataIndex:'startTime',
        render:(text,data)=>(
            <span>{`${data.startTime}:00`}</span>
        )
    },
     {
        key:'duration',
        title:'Duration',
        dataIndex:'duration',
        render:(text,data)=>(
            <span className='ml-3'>{data.duration}</span>
        )
    },
     {
        key:'Type',
        title:'Book Type',
        dataIndex:'bookType'
    }
]

  return (
   <>
   <Table
   
   columns={tabItems}
   dataSource={booking}
   />
   </>
  )
}

export default Incoming