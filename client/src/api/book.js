import { axiosInstance } from ".";

export const MakePayment=async({amount,userId})=>{

    try {
        const response=await axiosInstance.post('/turfo/booking/makepayment',{
            amount,
            userId
        })
        return response.data
        
    } catch (error) {
        return { 
        success: false,
        message: error.message }

        
        
    }
}
export const bookTurf=async(values)=>{
    try {
        const response=await axiosInstance.post('/turfo/booking/book-turf',values)
        return response.data
    } catch (error) {
    return { 
        success: false,
        message: error.message }

          
    }
}
export const getBookingTurfByDate=async(turf,date)=>{
try {
    const response=await axiosInstance.post('/turfo/booking/getBookingTurfByDate', {turf,date})
    return response.data
    
} catch (error) {
    return { 
        success: false,
        message: error.message }        
}
}

export const getBookingsTurfOwner=async(id)=>{
    try {
        const response =await axiosInstance.get(`/turfo/booking/incoming-req/${id}`)
        return response.data
    } catch (error) {
       return { 
        success: false,
        message: error.message }

        
    }
}

export const getGroupgameByCity=async(city,game,date)=>{
    try {    
        const response=await axiosInstance.get('/turfo/booking/get-all-group-game',{
            params:{
                city,
                date,
              ...(game &&{game  })
            }
        })
        return response.data
    } catch (error) {
        return { 
        success: false,
        message: error.message }

        
    }
}

export const getBookinById=async(id)=>{
    try {
        const response=await axiosInstance.get(`/turfo/booking/getBookings/${id}`)
        return response.data
    } catch (error) {
       return { 
        success: false,
        message: error.message }
    }
}
export const joinGame=async(values)=>{
    try {
        const response=await axiosInstance.post('/turfo/booking/join-game',values)
        return response.data
    } catch (error) {
       return { 
        success: false,
        message: error.message }
        
    }
}
export const getBookingUser=async()=>{
    try {
        const response=await axiosInstance.get('/turfo/booking/myBookings')
        return response.data
    } catch (error) {
       return { 
        success: false,
        message: error.message }
    }
}