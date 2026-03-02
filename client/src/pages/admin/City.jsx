import { Button, message, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideLoading,showLoading } from '../../../redux/slice/userSlice'
import { getAllCity } from '../../api/city'
const City = () => {
  const[city,setCities]=useState([])
const dispatch=useDispatch()
  const getData=async ()=>{
    try {
      dispatch(showLoading())
      const response=await getAllCity()
      if(response.success){
        setCities(response.data)

      }
    } catch (error) {
     message.error(error.message)
     

    }finally{
 dispatch(hideLoading())
 
    }
  }

useEffect(()=>{
getData()
},[])

  const columns=[
    {
      key:'name',
      title:'City Name',
      dataIndex:'name'
    },
    {
      key:'actions',
      title:'Action',
      render:(text,data)=>(
        <Space>
          <Button type='primary'>Edit</Button>
          <Button>Delete</Button>
        </Space>
      )
        
      
    } ,   
        

  ]
    
  return (
   <>
   <Button>Add City</Button>
   <Table columns={columns} dataSource={city}
   />
   </>
  )
}

export default City