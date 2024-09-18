import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url  = 'http://192.168.1.128:3000/api/users'

export const fetchUser = createAsyncThunk('user/fetchUser', async ()=>{
    const response = await axios.get(url)
    return response.data
})

export const LoginUser = createAsyncThunk('user/LoginUser', async(userName) =>{
    try {
        const response = await axios.get(`${url}/${userName}`);
        console.log('API Response:', response.data); 
        return response.data;
    } catch (error) {
        console.log('Error fetching user:', error); 
        throw error;

    }
})


const userSlice = createSlice({
    name: 'user',
    initialState:{
        userList:{},
         loading: false,
         error: ''
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(LoginUser.pending, (state, action) => {
            state.loading = true
        }) 
        .addCase(LoginUser.fulfilled, (state, action) => {
            state.loading = false
            state.userList = action.payload
            console.log(state.userList)
        }) 
        .addCase(LoginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        }) 
    }

})




export const userReducer =  userSlice.reducer