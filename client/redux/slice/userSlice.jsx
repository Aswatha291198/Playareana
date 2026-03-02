import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:'users',
    initialState:{
        user:null,
        loader:false,
        location:null
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        clearUser:(state)=>{
            state.user=null
        },
        showLoading:(state)=>{
            state.loader=true
        },
        hideLoading:(state)=>{
            state.loader=false
        },
        setLocation:(state,action)=>{
            state.location=action.payload
        }
        
    }
    
})
export default userSlice.reducer
export const{setUser,showLoading,hideLoading,clearUser,setLocation}=userSlice.actions
