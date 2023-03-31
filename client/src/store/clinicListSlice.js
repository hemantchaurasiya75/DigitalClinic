import { createSlice } from "@reduxjs/toolkit";

export const clinicListSlice = createSlice({
    name: "clinicList",
    initialState:[],
    reducers: {
        setClinics(state, action) {
            if(state.length===0){
                return [...state,...action.payload]
            }else{
                state = [];
                return [...state,...action.payload]
            }
            
        },
    }
});

export const { setClinics} = clinicListSlice.actions;
export default clinicListSlice.reducer;