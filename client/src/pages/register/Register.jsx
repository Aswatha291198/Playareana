import React from 'react'
import { Input,Form,Button,Radio } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideLoading,showLoading } from '../../../redux/slice/userSlice'
import { registerUser } from '../../api/user'
const Register = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
const onFinish= async(values)=>{
  try {
dispatch(showLoading())
    const response=await registerUser(values)
    if(response.success){
      navigate('/login')
    }
  } catch (error) {
    message.error(error);
    
  }finally{
dispatch(hideLoading())
  }
}


  return (
    <main className='d-f'>
    <section>
      <h2 className='color-g f-p'>Welcome To Turfo</h2>
    </section>
    <section className="py-3">
        
        <div style={{ width: 320, margin: '0 auto' }}>
          <Form
            layout="vertical"
            size="large"
            onFinish={onFinish}
          >
            
             <Form.Item
              label="Username"
              name="name"
              rules={[{
                required:true,
                message:'Username is required'
              }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
               rules={[{
                required:true,
                message:'email is required'
              }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
               rules={[{
                required:true,
                message:'password is required'
              }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                size="large"
                shape="round"
                htmlType="submit" 
                className='f-p ls '
                style={{ width: 120,
                  fontSize:'large',
                  fontWeight:600
                 }}
              >
                Register
              </Button>
            </Form.Item>
             <Form.Item
              label="Register as a Partner"
              htmlFor="role"
              name="role"
              className="d-f-center"
              initialValue={false}
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <div className="d-f-center">
                <Radio.Group name="radiogroup" className="">
                  <Radio value={"owner"}>Yes</Radio>
                  <Radio value={"player"}>No</Radio>
                </Radio.Group>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>
      <section 
      >
        <span className='font-p f-6 ls'>Already User</span>
        <Link  className=' font-p  f-6 py-3'to='/login'> Click Here</Link>
      </section>
    </main>
  )
}

export default Register