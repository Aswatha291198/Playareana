import React from 'react'
import { Modal, Card, Button, Form, Input, message } from 'antd'
import { hideLoading,showLoading } from '../../../redux/slice/userSlice'
import{useDispatch,useSelector}from 'react-redux'
import { addGame, updateGame } from '../../api/game'

const GameForm = ({
    isModalOpen,
    setIsModalOpen,
    selectedGame,
    setSelectedGame,
    getData,
    formType
}) => {
    const dispatch=useDispatch()
    const handleCancel=()=>{
        setIsModalOpen(false)
        setSelectedGame(null)
    }
    const onFinish=async(values)=>{
        try {
            let response=null
            dispatch(showLoading())
            if(formType==='add'){
                response=await addGame(values)
            }
            else{
                response=await updateGame({
                    ...values,
                    id:selectedGame._id
                })
            }
            if(response.success){
                message.success(response.message)
                getData()
                dispatch(hideLoading())
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
    return (
        <>
            <Modal
      centered
      title={formType === "add" ? "Add Game" : "Edit Game"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
      body={{ padding: "20px", backgroundColor: "#f9f9f9" }} // modal body
    >
      <Card
        style={{
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        <Form layout="vertical"
        onFinish={onFinish}>
          <Form.Item
            label="Game Name"
            name='name'
            style={{
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            <Input
              placeholder="Enter game name"
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            />
          </Form.Item>
             <Form.Item
            label="Poster"
            name='poster'
            style={{
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            <Input
              placeholder="Enter game poster"
              style={{
                borderRadius: "8px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right", marginTop: "20px" }}>
            <Button
              type="primary"
              style={{
                backgroundColor: "rgb(16, 151, 16)",
                borderColor: "rgb(16, 151, 16)",
                borderRadius: "8px",
                padding: "8px 20px",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
              }}
              htmlType='submit'
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
        </>
    )
}

export default GameForm