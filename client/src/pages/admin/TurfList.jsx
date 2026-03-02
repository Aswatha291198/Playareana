import { Table,Button,message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { hideLoading,showLoading } from '../../../redux/slice/userSlice'
import { getAllTurf,updateTurf } from '../../api/turf'
const TurfList = () => {
  const[turf,setTurfs]=useState([])
const dispatch=useDispatch()
  const getData=async ()=>{
    try {
      dispatch(showLoading())
      const response=await getAllTurf()
      if(response.success){
        setTurfs(response.data)
      }
    } catch (error) {
    message.error(error.message)
     

    }finally{
 dispatch(hideLoading())
 
    }
  }

    const handleStatusChange = async (turf) => {
    try {
      dispatch(showLoading());
      let values = {
        ...turf,
        turfId: turf._id,
        isActive: !turf.isActive,
      };
      const response = await updateTurf(values);
     
      if (response.success) {
        message.success(response.message);
        getData();
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

useEffect(()=>{
getData()
},[])

  const columns=[
    {
      key:'poster',
      title:'Poster',
      dataIndex:'poster',
      render:(text,data)=>{
        return <img src={data.poster}
        style={{
          width:100
        }} alt="poster" />
      }
    },

    {
      key:"turf",
      title:'Turf Name',
      dataIndex:'name',
     
    },
    {
      key:'email',
      title:'Email',
      dataIndex:'email',
      
    },
    {
      key:'num',
      title:'Number',
      dataIndex:'phone'
    },
    {
      key:'city',
      title:'City',
      dataIndex:'city',
      render:(text,data)=>{
        return <span>{data.city?.name}</span>  
      }
    },
    {
      key:'owner',
      title:'Owner',
      dataIndex:'owner',
      render:(text,data)=>{
        return <span>{data.owner?.name}</span>
      }
    },
    {
      key:'act',
      title:'Status',
      dataIndex:'actions',
       render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            {data.isActive ? (
              <Button onClick={() => handleStatusChange(data)}>Block</Button>
            ) : (
              <Button onClick={() => handleStatusChange(data)}>Approve</Button>
            )}
          </div>
        );
      },
    }
  ]
  return (
   <>
   <Table columns={columns} dataSource={turf}/>
   </>
  )
}

export default TurfList