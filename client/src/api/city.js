import { axiosInstance } from ".";

export const addCity=async (value)=>{
    try {
       const res=await axiosInstance.post('/turfo/city/add-city',value) 
       return res.data
    } catch (error) {
         return { 
        success: false,
        message: error.message }
        
    }
    
}
export const getAllCity=async()=>{
    try {
        const res=await axiosInstance.get('/turfo/city/all-city')
        return res.data
    } catch (error) {
        return { 
        success: false,
        message: error.message }
        
    }
}
export const updateCity =async(values)=>{
    try {
        const res=await axiosInstance.post('/turfo/city/update-city',values)
        return res.data
    } catch (error) {
         return { 
        success: false,
        message: error.message }
        
    }
}