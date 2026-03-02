import React from 'react'
import { Button, Form, Modal,Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import { hideLoading,showLoading } from '../../../redux/slice/userSlice'
import { addCity, updateCity } from '../../api/city'

const CityForm = ({getCity,
    visible,
    setVisible,
    city,
    setCity,
    formType
}) => {
    const dispatch=useDispatch()
const handleOk= async (values)=>{  
try {
    dispatch(showLoading())
    let response=null
    if(formType==='add'){
        response=await addCity(values)
    }
    else{
        response=await updateCity({
            id:city._id,
            values
        })
    }
    if(response.success){
        getCity()

        dispatch(hideLoading())
        setVisible(false)
    }
} catch (error) {
    message.error(message.error);
    dispatch(hideLoading())
    
}
}
const handleCancel=async()=>{
setVisible(false)
setCity(null)
}
    
  return (
    <>
    <Modal
    title={formType==='add'?'Add City':'Edit City'}
    open={visible}
    centered
    footer={null}
    onCancel={handleCancel}

    >
<Form
labelCol={{span:8}}
wrapperCol={{span:16}}
initialValues={formType==='add' ? " " :city }
onFinish={handleOk}
>
    
    <Form.Item
    name='name'
    label='City Name'
    >
        <Input/>
    </Form.Item>
     <Form.Item>
        <Button 
        type='primary'
        htmlType='submit'
        style={{
            position:'relative',
            left:'40px'
        }}
        >Save</Button>
    </Form.Item>
</Form>


    </Modal>
    </>
  )
}

export default CityForm