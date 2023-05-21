import { createSlice } from "@reduxjs/toolkit";



export const activeSingleSlice = createSlice({
    name: 'Single',
    initialState: {
        active: 'Mern SD'
    },
    reducers: {
        activeSingle:(state, action)=>{
            state.loggedIn = action.payload;

        }
    }
})


export const{ activeSingle} = activeSingleSlice.actions;
export default activeSingleSlice.reducer;