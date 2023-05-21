import {  configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "../Slice/LoginSlice";
import activeSingleSlice from "../Slice/ActiveSingleSlice"


const store = configureStore({
    reducer:{
    login: authSlice,
    active: activeSingleSlice,
    }

})

export default store;



// LoginSlice ke authSlice dake shobai


// jehitu onekgula reducer use korchi tai combineReducersuse korbo amra 
// Pura reducers ekhane combine kore shob kichu pathacche 
// reducer er kaaj hocche config korbe store e. Ar etar bhitore login naame ekta property nisi jetar bhitore pura reducers takey diye disi.
// Javascript er inbuilt ekta local ekta storage ase 
