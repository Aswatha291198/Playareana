import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Modal,Button, message } from 'antd';
import { joinGame, MakePayment } from '../../api/book';
import {useSelector,useDispatch} from 'react-redux'
import {hideLoading,showLoading} from '../../../redux/slice/userSlice'
import { useNavigate } from 'react-router-dom';

const JoinModel = ({
    gameModel,
    setGameModel,
    game,
    sportIconMap
}) => {
    const navigate=useNavigate()
    const[loading,setLoading]=useState(false)
    const disableBtn=game?.players.length===game?.maxPlayer
    const dispatch=useDispatch()
    const {user}=useSelector(store=>store.users)
    const stripe=useStripe()
    const elements=useElements()
    const handleJoin=async(transactionId)=>{
        try {
            dispatch(showLoading())
            const response=await joinGame({id:game?._id,transactionId})
            if(response.success){
                message.success(response.message)
                navigate('/myBookings')
            }
        } catch (error) {
            
        }finally{
            dispatch(hideLoading())
        }
    }
    const handlePayment=async()=>{
        if(!stripe || !elements){
          message.warning('Stripe not loaded')
          return }
        try {
            dispatch(showLoading())
            setLoading(true)
            const payload={
                amount:game?.pricePerPlayer *100,
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
                        await handleJoin(paymentIntent.id)    
                        }
            }
        } catch (error) {
            message.error(error.message);
            
        }
        finally{
            dispatch(hideLoading())
            setLoading(false)
        }
    }
  return (
    <> 
    <Modal
    open={gameModel}
    onCancel={()=>setGameModel(false)}
    footer={null}
    centered>
    <div className='flex-c gp-10'>
        <div className='d-flex gap'>
            <span className='font-p f-6 ls'
        style={{
            fontSize:'20px'
        }}
        >{game?.game?.name}</span>
        <span
                style={{
            fontSize:'20px'
        }}
        >{sportIconMap[game.game.name]}</span>
        </div>
        <span className='cap font-p f-6 ls font-large'>Hosted By {game.hostedBy.name}</span>
    </div>
    <div className='mt'>
        <CardElement/>
    </div>
        <div className='d-f-center mt'>
            <Button disabled={loading}
            loading={loading}
            className='font-p f-6'
            onClick={handlePayment}
            >{game.pricePerPlayer}</Button>
        </div>
        </Modal>   
    </>
  )
}

export default JoinModel