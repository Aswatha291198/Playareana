import { Button, message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading,showLoading } from '../../../redux/slice/userSlice'
import { getAllturfOwner, getTurfbyId } from '../../api/turf'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import TurfForm from './TurfForm'
import DeleteModal from './DeleteModal'

const Turf = () => {
  const [turfs,setTurfs]=useState([])
  const{user}=useSelector(store=>store.users)
  const dispatch=useDispatch()
  const[turfModal,setTurfModal]=useState(false)
  const[selectedTurf,setSelectedTurf]=useState(null)
  const[formType,setFormType]=useState('add')
  const [isDeleteModal,setIsDeleteModal]=useState(false)
  const getTurf=async()=>{
    
    try {
      dispatch(showLoading())
      const response=await getAllturfOwner(user?._id) 
        if(response.success){
          setTurfs(response.data)
        }    
    } catch (error) {
      message.error(error.message)      
    }finally{
    
      dispatch(hideLoading())

    }
  }

  useEffect(()=>{
if(user?._id){
  getTurf()
}
  },[user])

const columns =[
  {
    key:'turf',
    title:'Turf Name',
    dataIndex:'name'
  },
  {
    key:'email',
    title:'Email',
    dataIndex:'email'
  },
  {
    key:'loc',
    title:'Location',
    dataIndex:'city',
    render:(trxt,data)=>{
      return <span>{data?.city?.name}</span>
    }
  },
  {
    key:'add',
    title:'Address',
    dataIndex:'address',
  },
  {
    key:'price',
    title:'Price',
    dataIndex:'price',
  },
  {
    key:'open',
    title:'Opening Time',
    dataIndex:'open'
  },
  {
    key:'close',
    title:'Closing Time',
    dataIndex:'close'
  },
  {
    key:'active',
    title:'Status',
    dataIndex:'isActive',
    render:(text,data)=>{
      return <span>{data?.isActive ? 'Approved':'Pending'}</span>
    }
  },
  {
    key:'actions',
    title:'Actions',
    render:(text,data)=>{
      return <div className='d-flex gap '>
        <Button className='font-large'
        onClick={()=>{setFormType('edit')
          setSelectedTurf(data)
          setTurfModal(true)

        }}
        ><FiEdit/></Button>
        <Button
        onClick={()=>{
          setIsDeleteModal(true)
          setSelectedTurf(data)
        }}
        danger className='font-large'><MdDeleteOutline/></Button>
      </div>
    }
  }
]

  return (
    <>
    <div>
      <Button  className='mt font-p f-6 ls ml-3'
      onClick={()=>{
        
        setFormType('add')
        setTurfModal(true)
          
      }}
      type='primary'>Add Turf</Button>
      
        <Table columns={columns} dataSource={turfs}
     className='py-3 px-3'
     />
      {turfModal && <TurfForm
      formType={formType}
      turfModal={turfModal}
      setTurfModal={setTurfModal}
      selectedTurf={selectedTurf}
      setSelectedTurf={setSelectedTurf}  
      getTurf={getTurf} 
      />}
      {isDeleteModal &&( <DeleteModal
      isDeleteModal={isDeleteModal}
      setIsDeleteModal={setIsDeleteModal}
      selectedTurf={selectedTurf}
      setSelectedTurf={setSelectedTurf}
      getTurf={getTurf}
      />)}
    </div>
    </>
  )
}

export default Turf