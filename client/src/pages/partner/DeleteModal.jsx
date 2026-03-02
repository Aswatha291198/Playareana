import { Button, message, Modal } from 'antd'
import React from 'react'
import { showLoading,hideLoading } from '../../../redux/slice/userSlice'
import { useDispatch } from 'react-redux'
import { deleteTurf } from '../../api/turf'
const DeleteModal = ({
  isDeleteModal,
  setIsDeleteModal,
  selectedTurf,
  setSelectedTurf,
  getTurf
}) => {
const dispatch=useDispatch()
  const handleOk=async()=>{
    try {
      dispatch(showLoading())
      const response= await deleteTurf(selectedTurf?._id)
      if(response.success){
        message.success(response.message)
        setSelectedTurf(null)
        setIsDeleteModal(false)
        getTurf()
      }
    } catch (error) {
      message.error(error.message);
      
    }finally{
      dispatch(hideLoading())
    }
    
  }
  return (
    <>
    <Modal
    open={isDeleteModal}
    centered
    onCancel={()=>setIsDeleteModal(false)}
    onOk={handleOk}
    >
      <h2 className='font-p ls text-center color-g'>Delete</h2>
      <p className='font-p ls text-center mt f-6'>Are You sure you want to delete this turf</p>
     
    </Modal>
    </>
  )
}

export default DeleteModal