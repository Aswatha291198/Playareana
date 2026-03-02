import {Modal,Row,Col,Select,Input,Button, Dropdown, message,Form} from 'antd'
import React, { useEffect, useState } from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import moment from 'moment'
import { GoClock } from "react-icons/go";
import {showLoading,hideLoading} from '../../../redux/slice/userSlice'
import {useDispatch, useSelector}from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {getBookingTurfByDate, MakePayment } from '../../api/book';
import { bookTurf } from '../../api/book';
import { generateTimeSlots,getAvailableSlots } from '../../utils/slotUtils'
const BookModel = ({
    isBookModal,
    setIsBookModal,
    turf
}) => {
    const[selectedGame,setSelectedGame]=useState(null)
    const [duration,setDuration]=useState(1)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [actives,setActives]=useState('book')
    const [bookType,setBookType]=useState('book')
    const[booking,setBooking]=useState([])
    const{user}=useSelector(store=>store.users)
    const [selectedTime,setSelectedTime]=useState(Number)
    const[slotModal,setSlotModal]=useState(false)
    const[filterSlots,setFilterSlots]=useState([])
    const[open,setOpen]=useState(false)
    const[totalPlayers,setTotalPlayers]=useState(1)
    const[date,setDate]=useState(moment().format('YYYY-MM-DD'))
    const totalPrice =turf.price*duration 
    const pricePerPlayer=bookType==='host'? Math.ceil(totalPrice/totalPlayers):null
      const stripe = useStripe();
    const elements = useElements();    
    const removeAmorPm=(time)=>{
       return Number(moment(time, ['HH:mm', 'hh:mm A']).format('HH'))   
    }
    const[processing,setProcessing]=useState(false)
    
    const book=async(transactionId)=>{
    try {
      
        
        dispatch(showLoading())
        const startHour=Number(selectedTime.split(':')[0])
        const endTime=startHour +duration
        let response
        const payload={
        turf: turf._id,
        owner: turf.owner,
        hostedBy: user._id,
        bookType,
        date,
        startTime: startHour,
        endTime,
        duration,
        game:selectedGame,
        totalPrice,
        transactionId,
        ...(bookType === "host" && {
          pricePerPlayer,
          maxPlayers: totalPlayers
        })
      }
      response=await bookTurf(payload) 
        if(response.success){
            console.log('insdie if');
            
                message.success('Turf booked Successfully')
                navigate('/myBookings')
        }
        else{
            message.warning(response.message)
            console.log('insdie else');
        }
    } catch (error) {
        message.error(error.message)     
    }
}  
    const slots=generateTimeSlots(turf.open,turf.close,date)
    const availableSlots=getAvailableSlots(slots,booking)
    
    
    
     const getData=async()=>{
    try {
        const response=await getBookingTurfByDate(turf?._id,date)
        
        if(response.success){
            setBooking(response.data)
         
        }
    } catch (error) {
        message.error(error.message)
        
    }finally{
dispatch(hideLoading())
    }
}

useEffect(()=>{
getData()
},[date])
    const handleTimeChange=(e)=>{
        const selectedTime=parseInt(e.target.value)
        setSelectedTime(selectedTime)
    }
        const handlePayment=async()=>{
                    if(!stripe || !elements){
                        message.warning('Stripe not loaded')
                        return 
                    }
                    if(!selectedGame || !selectedTime ){
                        message.warning('Please Select all fields')
                        return 
                    }
                    try {
                        setProcessing(true)
                        const amountToCharge=bookType==='host'?pricePerPlayer:totalPrice 
                        dispatch(showLoading())
                        const payload={
                            amount:amountToCharge *100,
                            userId:user?._id
                        }
                        
                        const response=await MakePayment(payload)
                        if(response.success){
                            const clientSecret=response.data.clientSecret
                            
                            const{paymentIntent,error}=await stripe.confirmCardPayment(
                                clientSecret,
                                {payment_method:{
                                card:elements.getElement(CardElement),
                                billing_details:{name:user?.name}     
                                }}
                            )
                            if(error){
                                message.error(error.message)
                            }
                            else if(paymentIntent.status==='succeeded'){
                                message.success('Payment successfull')
                                console.log('hi');
                                
                                 await book(paymentIntent.id)  
                                 setProcessing(false)  
                                 setIsBookModal(false)
                            }

                            }
                        
                    } catch (error) {
                        message.error(error.message)
                    }finally{
                        dispatch(hideLoading())  
                        setProcessing(false)
                    }
                     }
   
    const handleDec=()=>{
    if(duration ===1){
        return
    }
    else{
        setDuration(duration-1)
    }
}
const handleInc=()=>{
    if(duration ===24){
        message.warning('Maximum duration is 24 hours')
    }
    if(!selectedTime){
        message.warning('Please Select a time')
    }
    if(removeAmorPm(selectedTime)+duration >=removeAmorPm(turf?.close)){
        message.warning('Cannot exceed closing time')
    }
    else{
        setDuration(duration+1)
    }
}


const handleDateChange=(e)=>{
setDate(moment(e.target.value).format('YYYY-MM-DD'))
}
return (
  <>
    <Modal
   centered
   open={isBookModal}
   onOk={handlePayment}
   onCancel={()=>{setIsBookModal(false)}}
   footer={null}
   >


<div className='flex-c gap'>

        <Row gutter={{xs:8,sm:12,md:16,lg:20}}>
        <Col span={24}>
        <h2>{turf.name}</h2>
        <span>{turf.address}</span>
        </Col>
    </Row>
    <Row>
    <Col>
    <span className='font-p f-6'>Booking Type</span></Col>
    <Col className='ml-3'>

   <div className='d-flex gap ml-3 ' >
     <Button className={`font-p f-6 ls  ${actives==='book' ?'actives':''}`}
     onClick={()=>{
        setBookType('book')
        setActives('book')
     }}
     >Book a Game</Button>
    <Button
    className={`font-p f-6 ls  ${actives==='host' ?'actives':''}`}
    onClick={()=>{
        setBookType('host')
        setActives('host')
    }}
    >Host a Game</Button>
   </div>
    </Col>
    </Row>

    {bookType==='host' &&(
        <Row>
            <Col>
            <span className='font-p f-6 ls'>Total Players</span>
            </Col>
            <Col className='ml-3'>
            <Input className='ml-3'
            type='number'
            value={totalPlayers}
            onChange={(e)=>setTotalPlayers(e.target.value)}
            min={1}
            max={12}
            />
            </Col>
        </Row>
    )}

    <Row  gutter={{xs:8,sm:12,md:16,lg:20}}>
        <Col span={8}>
        <span className='font-p f-6'>Sports</span>
        </Col>
        <Col span={12}>
        <Select
        onChange={(value)=>setSelectedGame(value)}
        placeholder='Pick a Sport'
        options={turf?.AddSport?.map((sport)=>{
            return {
                label:sport.name,
                value:sport._id
            }
        }
        )}
        />
        </Col>
    </Row>
    <Row  gutter={{xs:8,sm:12,md:16,lg:20}}>
        <Col span={8}>
        <span className='font-p f-6'>Date</span>
        </Col>
        <Col span={12}>
            <Input type='date'
            value={date}
            onChange={handleDateChange}
            />
        </Col>
    </Row>
    <Row  gutter={{xs:8,sm:12,md:16,lg:20}}>
        <Col span={8}>
        <span className='font-p f-6'>Start Time</span></Col>
        <Col span={12}>
            <div className='border-black c-p text-center d-f-center '
            style={{
                height:40,
                borderRadius:10
            }}
            >
                <Dropdown
  trigger={['click']}
  placement="bottomLeft"
  className='c-p'
   open={open} // control open state
   onOpenChange={(flag) => setOpen(flag)}
  popupRender={() => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        backgroundColor: 'white',
        maxWidth: 200
    }}>
        {availableSlots.length === 0 ? (  
            <span className='font-p f-6 ls font-small'
            style={{
                width:150
            }}>
                No slots available, please change the date 
            </span>
        ) : (
            availableSlots.map((slot, idx) => (
                <div key={idx}
                    onClick={() => {
                        setSelectedTime(slot)
                        setOpen(false)
                    }}
                    style={{ width: 50, height: 50 }}
                    className='border bor text-center c-p'
                >
                    {slot}
                </div>
            ))
        )}
    </div>
)}
>
  <button
  className='font-p f-6 d-flex justify-content-between'
  style={{
    border:'none',
    backgroundColor:'white'
  }}
  >{selectedTime?selectedTime:'Pick a Time'}
  <GoClock 
  className='ml-3 font-larger b-color '
  />
  </button>
  
</Dropdown>
            </div></Col>
    </Row>
    <Row  gutter={{xs:8,sm:12,md:16,lg:20}}>
        <Col span={8}>
        <span className='font-p f-6 ls' >Duration</span>
        
        </Col>
        <Col span={12}>
        <div className='d-flex justify-content-between'> 
           <Button
           disabled={duration <=1  }
           onClick={handleDec}
           onMouseOver={(e)=>{
            e.currentTarget.style.color='none'
          }}
           style={{
            border:'none'
          }}
           >
            <CiCircleMinus
            style={{
            fontSize:'30px',
            color:'rgb(0,189,78)'
          }}
          
            />  
           </Button>
         <input type="text"
         style={{
            outline:'none',
            border:'none',
            textAlign:'center'
         }}
         className='font-p f-6'
            value={duration}/>
         
          <Button disabled={duration===24 || removeAmorPm(selectedTime)  + duration >= removeAmorPm(turf?.close)}
          onClick={handleInc}
          onMouseOver={(e)=>{
            e.currentTarget.style.color='none'
          }}
          style={{
            border:'none'
          }}
          >
            <CiCirclePlus style={{
            fontSize:'30px',
            color:'rgb(0,189,78)'
          }} />
          </Button>
        </div>
        </Col>
    </Row>
    <Row className='mt' 
    gutter={{xs:8,sm:12,md:16,lg:20}}>
        <Col span={12}>
        <span className='font-p f-6 ls'>Price</span>
        </Col>
        <Col span={12}>
        <span className='font-p f-6'>{turf.price * duration} Price Per Hour</span>
        </Col>
    </Row>
   <Row  gutter={{xs:8,sm:12,md:16,lg:20}}
   className='mt'>
    <Col span={24}>
     <CardElement/> 

     </Col>
     
   </Row>
 <div className='d-f-center '>
      <Button 
   disabled={processing}
   className='font-p f-6 ls mt color-g font-large'
   style={{
    height:40
   }} 
   onClick={handlePayment}>{bookType==='book' ?totalPrice :Math.ceil(totalPrice/totalPlayers )}</Button> 
 </div>
</div>
    
        
   </Modal>

   </>  
  )
}

export default BookModel