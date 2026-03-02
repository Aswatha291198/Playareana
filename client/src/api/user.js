import { axiosInstance } from ".";

export const loginUser=async(values)=>{  
    try {
        const response=await axiosInstance.post('/turfo/user/login',values)
        return response.data
        
    } catch (error) {
         return { 
        success: false,
        message: error.message }

        
    }
}
export const registerUser=async(values)=>{
    try {
        const response=await axiosInstance.post('/turfo/user/register',values)
        return response.data
        
    } catch (error) {
      return { 
        success: false,
        message: error.message }

        
    }
}
export const GetCurrentUser=async(values)=>{
    try {
        const response=await axiosInstance.get('/turfo/user/current')
        return response.data
        
    } catch (error) {
      return { 
        success: false,
        message: error.message }

        
    }
}
export const updateuser=async(values)=>{
    try {
  
        const response=await axiosInstance.post('/turfo/user/update-user',values)
        return response.data
    } catch (error) {
        return { 
        success: false,
        message: error.message }
        
    }
}
export const forgetPassword=async(values)=>{
    try {
        const response=await axiosInstance.post('/turfo/user/forget',values)
        return response.data
    } catch (error) {
         return { 
        success: false,
        message: error.message }

        
    }
}
export const getAllUsers=async()=>{
    try {
        const response=await axiosInstance.get('/turfo/user/all-users')
        return response.data
    } catch (error) {
         return { 
        success: false,
        message: error.message }

    }
}
export const ResetPassword=async(values)=>{
    try {
       
        
        const response=await axiosInstance.post('/turfo/user/reset',values)
        return response.data
    } catch (error) {
        return { 
        success: false,
        message: error.message }
        
    }
}
