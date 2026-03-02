import { Button, Form, Input, message } from 'antd'
import React from 'react'
import {useNavigate,Link} from 'react-router-dom'
import { loginUser } from '../../api/user'
import { useDispatch } from 'react-redux'
import { hideLoading,showLoading } from '../../../redux/slice/userSlice'
const Login = () => {
const navigate=useNavigate()
const dispatch=useDispatch()
const onFinish=async(values)=>{
try {
  dispatch(showLoading())
  const response=await loginUser(values)
  if(response.success){
    localStorage.setItem('token',response.data)
    message.success("User is successfully logged In")
    navigate('/')
  }
  else{
    message.error(response.message)
    dispatch(hideLoading())
  }
} catch (error) {
  message.error(error.message)
  dispatch(hideLoading())
}
finally{
  dispatch(hideLoading())
}
}



  return (
    <main className="d-f">
      <section>
        <h2 className="color-g font-poppins ls">Login to Turfo</h2>
      </section>

      <section className="py-3">
        
        <div style={{ width: 320, margin: '0 auto' }}>
          <Form
            layout="vertical"
            size="large"
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                size="large"
                shape="round"
                htmlType="submit"
                style={{ width: 120 }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
      <section>
        <span className='font-p f-6 py-3  ls c-p'> New User ?<Link to='/register'>Register Here</Link> </span>
         <span className='font-p py-3 f-6 ls c-p mt'>Forgot Password <Link to='/forget'>Click Here</Link> </span>
      </section>
    </main>
  )
}

export default Login
