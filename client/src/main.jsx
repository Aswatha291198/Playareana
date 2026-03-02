import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from 'react-router-dom'

const stripePromise=loadStripe('pk_test_51SomJmFzrRZ5SvS3NgFnOvGkmUBwNFEi02pzV0c86b2e77dDtvAW89DrGJwd4lcAqyIbl7avXACSHh3d4knxzd3Y00q13EP157')

createRoot(document.getElementById('root')).render(
 <Elements stripe={stripePromise}>
  <BrowserRouter>
    <App /></BrowserRouter>
 </Elements>
    
    
  
)
