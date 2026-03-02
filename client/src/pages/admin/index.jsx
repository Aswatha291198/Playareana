import { Tabs } from 'antd'
import React from 'react'
import TurfList from './TurfList'
import City from './City'
import GameList from './GameList'
import Edit from '../Edit-profile/Edit'

const index = () => {
const tabItems=[
  {
    key:'turfList',
    label:'TurfList',
    children:<TurfList/>
  },
  {
    key:'city',
    label:'Cities',
    children:<City/>
  },
  {
    key:'games',
    label:'GameList',
    children:<GameList/>
  },
  {
    key:'edit',
    label:'Edit-Profile',
    children:<Edit/>
  }


]

  return (
   <>
   <div className='m-20 w-color'>
    <h2 className='py-3 font-p'>Admin Dashboard</h2>
   <Tabs 
   className='ml-3'
   items={tabItems}/>
   </div>
   </>
  )
}

export default index