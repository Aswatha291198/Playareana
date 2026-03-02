import { axiosInstance } from ".";

export const addTurf = async (values) => {
    try {
        const response = await axiosInstance.post('/turfo/turfs/add-turf', values)
        return response.data
    } catch (error) {
        return { 
        success: false,
        message: error.message }

    }
}
export const updateTurf = async (values) => {
    try {
        const response = await axiosInstance.put('/turfo/turfs/update-turf',values)
        return response.data
    } catch (error) {
         return { 
        success: false,
        message: error.message }
    }
}
export const deleteTurf = async (id) => {  
    try {
        const response = await axiosInstance.delete(`/turfo/turfs/delete/${id}`)
        return response.data
    } catch (error) {
        return { 
        success: false,
        message: error.message }

    }
}
export const getAllTurf = async () => {
    
    try {
        const response = await axiosInstance.get('/turfo/turfs/all-turf')
        return response.data
    } catch (error) {
         return { 
        success: false,
        message: error.message }

    }
}
export const getTurfbyId = async (id) => {
    try {
        const response = await axiosInstance.get(`/turfo/turfs/turf/${id}`)
        return response.data
    } catch (error) {
        return { 
        success: false,
        message: error.message }
    }
}
export const getAllturfOwner = async (id) => {
    try {
        const response = await axiosInstance.get(`/turfo/turfs/turf/owner/${id}`)
        return response.data
    } catch (error) {
        return { 
        success: false,
        message: error.message }
  
    }
}

export const getTurfByCity =async(city)=>{
    try {
        
        const response=await axiosInstance.get('/turfo/turfs/get-turf-by-city',{params:{city}})
        return response.data
    } catch (error) {
        return { 
        success: false,
        message: error.message }

    }
}