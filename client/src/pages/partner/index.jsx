import { Tabs } from 'antd'
import React from 'react'
import Turf from '../partner/Turf'
import Edit from '../Edit-profile/Edit'
import Incoming from './Incoming'
const index = () => {
  const tabItems=[
    {
      key:'turf',
      label:'Turf',
      children:<Turf/>
    },
    {
      key:'edit',
      label:'Edit-profile',
      children:<Edit/>
    },
    {
      key:'i',
      label:'Incoming',
      children:<Incoming/>
    }
  ]
  return (
    <>
   <div className='m-20'>
     <Tabs items={tabItems} style={{
     margin:'5px'}}/>
   </div>
    
    </>
  )
}

export default index