import {axiosInstance} from './index'

export const addGame=async(values)=>{
    try {
        const res=await axiosInstance.post('/turfo/game/add-game',values)
        return res.data
    } catch (error) {
       return { 
        success: false,
        message: error.message }

        
        
    }
}
export const getAllGame=async(values)=>{
    
    
    try {
        const res=await axiosInstance.get('/turfo/game/allgame')
        return res.data
    } catch (error) {
       return { 
        success: false,
        message: error.message }
        
    }
}
export const deleteGame=async(id)=>{
    
    
    try {
        const res=await axiosInstance.delete(`/turfo/game/delete-game/${id}`)
        return res.data
    } catch (error) {
         return { 
        success: false,
        message: error.message }
        
    }
}
export const updateGame=async(values)=>{
    
    
    try {
        const res=await axiosInstance.post('/turfo/game/update-game',values)
        return res.data
        
    } catch (error) {
         return { 
        success: false,
        message: error.message }
        
    }
}