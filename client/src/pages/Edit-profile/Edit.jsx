import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './edit.css'
import { Button, Form,Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoading,showLoading,setUser } from '../../../redux/slice/userSlice';
import { updateuser } from '../../api/user';
import { GetCurrentUser } from '../../api/user'

const Edit = () => {
  const{user}=useSelector(store=>store.users)
  const dispatch=useDispatch()

  const onFinish=async(values)=>{
    try {
      dispatch(showLoading())
      const edit=await updateuser({...values,id:user._id})

      if(edit.success){
        message.success(edit.message)
          await GetCurrentUser()
        dispatch(hideLoading())
        
      }
      await GetCurrentUser()
        } catch (error) {
      message.error(error.message)
      dispatch(hideLoading())
      
    }
  }
  
  return (
    <>
    <div className="w-color flex-c gap"
    style={{
      minWidth:'400px',
      minHeight:'300px'
    }}
    >
    <div className="px-3 ">
        <span className='font-p f-6 ls ml-3 font-large'>Edit-Profile</span>
    </div>
      <div className="">
         <Form
    name="basic"
    style={{
      width:'400px'
    }}
    initialValues={{ 
      name:user?.name,
      email:user?.email
     }}
     onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
    label='Username'
    name='name'
    className='ml-3'
    rules={[{required:true}]}>
      <Input/>
    </Form.Item>
     <Form.Item
    label='Email'
    name='email'
    className='ml-3'
    rules={[{required:true}]}>
      <Input/>
    </Form.Item>
    <Form.Item
  className='d-f-center'
    >
      <Button 
      type='primary'
      htmlType='submit'
      className='font-p ml-3'>Save</Button>
    </Form.Item>
  </Form>
      </div>
    </div>
    
    </>
  )
}

export default Edit