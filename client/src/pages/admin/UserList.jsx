import React, { useEffect, useState } from 'react'
import {message, Table} from 'antd'
import {hideLoading,showLoading} from '../../../redux/slice/userSlice'
import {useDispatch} from 'react-redux'
import { getAllUsers } from '../../api/user'

const UserList = () => {
    const[users,setUsers]=useState(null)
    const dispatch=useDispatch()

    const getData=async()=>{
        try {
            dispatch(showLoading())
            const response=await getAllUsers()
            if(response.success){
                setUsers(response.data)
                message.success(response.message)
            }else{
                message.error(response.message)
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

    const tableitems =[
        {
        title:"Name",
        dataIndex:'name',
        key:'name'
        },{
        title:"Email",
        dataIndex:'email',
        key:'email'
        },
        {
            title:'role',
            dataIndex:'role',
            key:'role'
        },
        {
            title:'created At',
            dataIndex:'createdAt',
            key:'createAT'
        }
    ]
  return (
   <>
   <h1>User List</h1>
   <Table dataSource={users} columns={tableitems}/>
   </>
  )
}

export default UserList