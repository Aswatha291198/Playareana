  import React, { useEffect, useState } from 'react'
  import { Dropdown, Layout, message,Modal,Select } from 'antd'
  import { useSelector,useDispatch } from 'react-redux'
  import { showLoading,hideLoading,setUser } from '../../redux/slice/userSlice'
  import { NavLink, useNavigate } from 'react-router-dom'
  import { GetCurrentUser } from '../api/user'
  import { GiSoccerKick } from "react-icons/gi";
  import { MdSportsVolleyball } from "react-icons/md";
  import { GiIncomingRocket } from "react-icons/gi"
  import { getAllCity } from '../api/city'
  import { setCity,setCities,setCityModal } from '../../redux/slice/citySlice'
  import CityModal from './Modals/CityModal'
  import './protected.css'

  const Protected = ({children}) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const{user}=useSelector(store=>store.users)
    const{selectedCity,cities,isCityModal}=useSelector(store=>store.cities)
  const {Header,Footer,Content}=Layout
  
  const getUser=async()=>{
    try {
      dispatch(showLoading())
      const response=await GetCurrentUser()
      if(response.success){
        dispatch(setUser(response.data))
      }
      const cityResponse=await getAllCity()
      if(cityResponse.success){
        dispatch(setCities(cityResponse.data))
      }
      else{
        message.error(response.message)
        navigate('/login')
        dispatch(hideLoading())
      }
      if(response.status===401){
        navigate('/login')
        localStorage.removeItem('city')
      }
    } catch (error) {   
      dispatch(hideLoading()) 
    }
    finally{
      dispatch(hideLoading())
    }
  }

  const handleProfile=()=>{
  if(user?.role==='player'){
    navigate('/player')
  }else if(user?.role==='admin'){
  navigate('/admin')
  }
  else{
    navigate('/owner')
  }
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getUser()
    }
    else{
      navigate('/login')
    }
  },[])
  useEffect(()=>{
  if(!localStorage.getItem('city') && user?.role==='player'){
  dispatch(setCityModal(true))
  }
  },[user])

  const dropMenu=[
    {
      key:'p',
      label:(
        <span 
        className='font-p f-6 ls'
        onClick={()=>handleProfile()}>Profile</span>
      )
    },
    {
      key:'l',
      label:(
        <span 
        className='font-p f-6 ls'
        onClick={()=>{
          localStorage.removeItem('token')
          localStorage.removeItem('city')
          navigate('/login')
        }}
        >Logout</span>
      )
    }
  ]
  const menuRoles={
    player:[
      {
        label: 'Book',
        path:localStorage.getItem('city')
        ? `/book?city=${localStorage.getItem('city')}`
        : '/book',
      icon: <MdSportsVolleyball />
    },
      {label:'Play',
        path:localStorage.getItem('city')
        ? `/play?city=${localStorage.getItem('city')}`
        : '/play',
        icon:<GiSoccerKick/>} 
    ],
  }

    return (
      <>
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{
        position:'sticky',
        top:0,
        zIndex: 1000
      }}>
        <section>
          <h2 className='f-p color-g  c-p   f-size font-s py-3 px-3 mt p-left'
          onClick={()=>navigate('/')}>Turfo</h2>
        </section>
      <div className='header p-left'>
        <ul className='d-flex p-left g-4 justify-content-between '>
          {menuRoles[user?.role]?.map((item,index)=>(
            <li className='menu-item none p-left  f-size py-3 mt ' key={index}>
              <NavLink
              to={item.path}
              className={({isActive})=>
                isActive ?' menu-item active':'menu-item'}>
              <span className='f-6 ls'>{item.label}</span>
              <span className='py-3 px-3 font-larger'>{item.icon}</span>
              </NavLink>
            </li>
        ))}
        </ul>
      </div>
      <section className='d-flex end w-200 px-3 mt'>
      <Dropdown
      menu={{items:dropMenu}}
      trigger={['click']}
      >
          <span className='cap font-p f-6 font-large c-p'>{user?.name}</span>
      </Dropdown>
      </section>
      </Header>

      <Content style={{ flex: 1, background: 'rgb(241,243,242)', overflow: 'hidden',marginBottom:'40px' }}>
        {isCityModal && <CityModal isCityModal={isCityModal}/>}
        {children}
      </Content>

      <Footer className='font-p f-6 font-large'
        style={{
          textAlign:'center',
          backgroundColor:'rgb(0,189,78)',
          color:'white',
        
        }}
      >Turfo ©</Footer>

    </Layout>
      </>
    )
  }

  export default Protected