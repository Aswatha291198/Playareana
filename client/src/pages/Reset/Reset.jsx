import React from 'react'
import { Button, Form, Input,message } from "antd";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../../redux/slice/userSlice';
import { ResetPassword } from '../../api/user';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const onFinish=async(values)=>{
        try {
            dispatch(showLoading()) 
            const response = await ResetPassword(values)
             if(response.success){
                message.success(response.message)
                navigate('/login')
             }
             else{
                message.warning(response.message)
                navigate('/forget')
             }
        } catch (error) {
            message.error(error.message)
            
        }finally{
            dispatch(hideLoading())
        }
    }
  return (
     <>
      <header className="d-f">
        <main className="flex-c gp-10">
          <section>
            <h1 className='font-p f-6 ls'>Reset Password</h1>
          </section>
          <section >
            <Form layout="vertical" onFinish={onFinish} >
              <Form.Item
                label="OTP"
                htmlFor="otp"
                name="otp"
                
                rules={[{ required: true, message: "OTP is required" }]}
              >
                <Input
                  id="otp"
                  type="number"
                  placeholder="Enter your otp"
                ></Input>
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
               
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your New Password"
                ></Input>
              </Form.Item>
              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  className='font-p'
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  RESET PASSWORD
                </Button>
              </Form.Item>
            </Form>
          </section>
        </main>
      </header>
    </>
  )
}

export default Reset