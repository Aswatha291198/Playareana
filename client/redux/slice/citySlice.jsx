import {createSlice} from '@reduxjs/toolkit'

const citySlice=createSlice({
    name:'cities',
    initialState:{
        selectedCity:null,
        cities:[],
        isCityModal:false
    },
    reducers:{
        setCity:(state,action)=>{
            state.selectedCity=action.payload
        },
        setCities:(state,action)=>{
            state.cities=action.payload
        },
        setCityModal:(state,action)=>{
           state.isCityModal=action.payload     
        }
        
    }
    
})
export default citySlice.reducer
export const{setCity,setCities,setCityModal}=citySlice.actions
