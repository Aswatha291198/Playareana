import { message, Modal } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { hideLoading,showLoading } from '../../../redux/slice/userSlice'
import { deleteGame } from '../../api/game'


const DeleteGame = ({
    deleteModal,
    setDeleteModal,
    selectedGame,
    setSelectedGame,
    getData
}) => {
    const dispatch=useDispatch()

    const handleOK=async()=>{
        try {
        dispatch(showLoading())
        const response=await deleteGame(selectedGame._id)
        if(response.success){
            message.success(response.message)
            getData()
        } 
        else{
            message.error(response.message)

        }   
       
        } catch (error) {
           message.error(error.message)
            
        }finally{
           dispatch(hideLoading())
        }
    }
    const handleCancel=()=>{
        setDeleteModal(false)
        setSelectedGame(null)
    }
  return (
   <>
   <Modal
    centered
      title="Delete Theatre"
      open={deleteModal}
      onCancel={handleCancel}
      onOk={handleOK}
    >
      <p className="pt-3 fs-18">
        Are you sure you want to delete this game?
      </p>
      <p className="pb-3 fs-18">
        This action can't be undone and you'll lose this game data.
      </p>{" "}
      </Modal>
   </>
  )
}

export default DeleteGame