import React, { useEffect, useState } from 'react'
import { hideLoading,showLoading } from '../../../redux/slice/userSlice'
import { useSelector,useDispatch } from 'react-redux'
import { getBookinById } from '../../api/book'
import { useParams } from 'react-router-dom'
import { Button, message } from 'antd'
import { MdOutlineSportsCricket } from "react-icons/md";
import { BiFootball } from "react-icons/bi";
import { GiTennisBall } from "react-icons/gi";
import { IoBasketballOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import moment from 'moment'
import { LuMapPin } from "react-icons/lu";
import {UserOutlined} from '@ant-design/icons'
import { FaCrown } from "react-icons/fa"
import userImg from '../../assets/user.png'

import JoinModel from './JoinModel'
const SingelGame = () => {
    const{user}=useSelector(store=>store.users)
    const dispatch=useDispatch()
    const [game,setGame]=useState([])
    const [gameModel,setGameModel]=useState(false)
    const getDay=(date)=>{
        const formattedDay=moment(date).format('dddd')
        return formattedDay
    }
    const getDate=(date)=>{
        const formattedDate=moment(date).format('DD MMM YYYY')
        return formattedDate
    }
    const getTime=(time)=>{
       
        const formattedTime=moment(time,'HH').format('h:mm A')
        return formattedTime
    }
    const disabledBtn=game?.players?.some((p)=>{
      return  p?.user?._id?.toString() === user?._id?.toString()

    })
    const sportIconMap = {
      Cricket: <MdOutlineSportsCricket />,
      Football: <BiFootball />,
      Tennis: <GiTennisBall />,
      Basketball: <IoBasketballOutline />,
    }
    const params=useParams()
    const{id}=params
const getData=async()=>{
    try {
        dispatch(showLoading())
        const response=await getBookinById(id)
        if(response.success){
            setGame(response.data)
        }
        else{
            message.error(response.message)
        }
    } catch (error) {
        error.message(error.message);
        
    }finally{
            dispatch(hideLoading())
    }
}

useEffect(()=>{
    getData()
},[])
  return (
   <>
   <main className='flex-c '>
    <div className='d-flex  gap'>
        <section className='d-flex w-100  m-20'>
        <div className='d-flex ml-3 w-color w-7 bor '>
            <div className='m-20  border-black w-100 bor flex-c gap'>
                <div className='ml-3 flex-c  mt'>
                   <div className='d-flex'> 
                        <span className='ml-3 f-size'>{sportIconMap[game?.game?.name]}</span>
                     <h2 className='font-p b-color ls ml-3'>{game?.game?.name}</h2>
                   </div>
                    <span className='cap ml-3 font-p'>Hosted by {game?.hostedBy?.name}</span>
                </div>
                <div className='flex-c ml-3 gp-10'>
                    <div className='ml-3 d-flex gp-10 mt'>
                 <FaRegClock
                 className=' font-larger b-color'/>
                    <span 
                    className='font-larger font-p f-6 b-color'
                    style={{
                        position:'relative',
                        bottom:4
                    }}
                    >{getDay(game?.date)}, {getDate(game.date)}</span>
                </div>
                <div className='ml-3'>
                    <span className='font-p '>{getTime(game.startTime)} to </span>
                     <span className='font-p '>{getTime(game.endTime)}  </span>
                </div>
                </div>
                <div className='ml-3 play-div'>
                        <LuMapPin
                        className='ml-3 font-larger'
                        />
                        <span className='font-p f-6'>{game?.turf?.address},</span>
                         <span className='font-p f-6'>{game?.turf?.city?.name}</span>
                </div>
                <div></div>
            </div>
            
        </div>
            <div className='ml-3 w-color flex-c'
            style={{
                width:'30%',
                borderRadius:30,
                minHeight:'200px'
            }}>
                <div className='mt'>
                    <span className='font-p font-larger f-6 ml-3'>Players </span>
                    <span className='font-p f-6'>({game?.players?.length})</span>
                </div>
                
                {game?.players?.map((player)=>{
                    return (
                        <div
                        className='m-20 gp-10 d-flex'
                        key={player.user._id}
                        >
                            <span 
                             style={{
                                width:'80px'
                             }}
                            ><img src={userImg} alt="x" 
                            style={{
                                width:'50%'
                            }}/></span>
                            <span className='cap font-p mt f-6 '>{player?.user?.name}</span>
                            {player?.user?._id.toString()===game?.hostedBy?._id.toString() && (

                                <span className='font-p mt f-6'>(Host)</span>
                            )}
                        </div>
                    )
                })}
               
            </div>
    </section>
    </div>
     <div className='d-flex p-left'>
        <Button className='font-s ls f-6 c-p font'
        onClick={()=>{
            setGameModel(true)
            }}
            disabled={disabledBtn ||game?.players?.length===game.maxPlayers}
            style={{
                backgroundColor:'rgb(0,189,78)',
                color:'white'
            }}
        >
             {game?.players?.length === game?.maxPlayers 
             ? 'Slot Full' 
             : disabledBtn 
             ? 'Already Joined' 
             : 'Join Game'}
            </Button></div>
        {gameModel && (<JoinModel
        gameModel={gameModel}
        setGameModel={setGameModel}
        game={game}
        sportIconMap={sportIconMap}
        />)}
   </main>
   
   
   </>
  )
}

export default SingelGame