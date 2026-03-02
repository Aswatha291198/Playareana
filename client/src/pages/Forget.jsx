import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slice/userSlice";
import { forgetPassword } from "../api/user";

const Forget = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const onFinish=async(values)=>{
        try {
            dispatch(showLoading())
            const response =await forgetPassword(values)
            if(response.success){
              message.success(response.message)
              navigate('/reset')
            }
            else{
              if(response.message==='Please use otp sent on mail'){
                navigate('/reset')
              }
            }
        } catch (error) {
            message.error(error.message)
        }finally{
            dispatch(hideLoading(   ))
        }
    }
  return (
    <>
      <header className="d-f">
        <main className="text-center px-3 flex-c gap">
          <section className="mb">
            <h1 className='font-p  ls'>Forget Password</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical"
            onFinish={onFinish} >
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your Email"

                ></Input>
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  className='f-6 font-large font-p ls'
                >
                  SEND OTP
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p className='font-p f-6'>
                Existing User? <Link to="/login">Login Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  )
}

export default Forget