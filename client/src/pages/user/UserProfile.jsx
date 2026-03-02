import { Tabs } from 'antd'
import React from 'react'
import Bookings from './Bookings/Bookings'
import { useNavigate } from 'react-router-dom'
import Edit from '../Edit-profile/Edit'
const UserProfile = () => {

  const navigate=useNavigate()

  const tabItems=[
    {
      key:'book',
      label:'Bookings',
      children:<Bookings/>,
      
      
    },
    {
      key:'edit',
      label:'Edit-Profile',
      children:<Edit/>,
      
    }
  ]
  return (
    <div className='d-f-center'>
    <Tabs items={tabItems}  className='user-tabs px-3 m-20 '
    tabBarStyle={{
      
      borderRadius:10,
      padding:'0 10px'
    }}
    type='card'
    />
  </div>
  )
}

export default UserProfile