import { configureStore } from '@reduxjs/toolkit';
import clinicList from "./clinicListSlice";
import auth from './authSlice';

 const store = configureStore({
    reducer:{
        clinicList,
        auth,
    }
 });

 export default store;