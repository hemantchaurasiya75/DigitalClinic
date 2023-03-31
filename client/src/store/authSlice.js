import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    // user:null,
    user: {
        userid:3,
        firstname:"hariom kumar",
        lastname:"chaurasiya",
        email:"hariom@gmail.com",
        phone:"1234567890",
        role:"DOCTOR"
        // role:"PATIENT"
    },
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setAuth:(state,action)=>{
            const { user } = action.payload;
            state.user = user;
            if (user === null) {
                state.isAuth = false;
            } else {
                state.isAuth = true;
            }
        }
    }
});

export const {setAuth} = authSlice.actions;
export default authSlice.reducer;