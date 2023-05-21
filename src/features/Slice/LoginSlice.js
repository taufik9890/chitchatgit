// import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// Createslice er kaaj hocche shokol slice er kaaj gula niye asha. Createslice function er moddhe amra ekta object banabo
// export const userSlice = createSlice ---> Etar maddhome ami shudhu variable ke export kortesi
// export default userSlice.reducer; er maddhome ami shob file export kortesi 
// export const userSlice = createSlice ---->  etate 3 ta jinish thakbe. Ekta hocche name, ekta hocche initialState, ar arekta hocche reducers
// name hocche ekta naam deya 
// initialState e amader shurur dike amader state kemon thakbe. Jehitu ekta user login kore nai tahole kono value toh dibe na. Tai null set kore dite hoy 
// reducers ta hocche ekta object ar ei object e shokol kaaj korbe. Shokol action ekhane kaaj korbe 
// Login user e 2 ta parameter dite hoy. Ekta hocche state arekta hocche Action. Ami chailei parameter er naam paltaite parbo na. state ta hocche initialState.
// State manei hocche initialState
// Payload hocche ekek shomoy ekek action korbe. Ekekta user er action dynamically handle kore payload. Action hocche ekbar data ane. Ar payload specific shob user er action kore.
// Payload shob gula data ke ekta object er maddhome niye ashbe. Action just trigger korbe. Ar Payload ekek shomoy ekekjon login korte parbe
// createSlice korar pore actions naamer nijessho ekta property banay rakhe. ar Loginusers hocche amader actions property 
// export const userSlice = createSlice({
//     name: 'Login',
//     initialState: {
//         loggedIn: null,
//     },
//     reducers:{
//         Loginusers:(state,action)=>{
//             state.loggedIn = action.payload
//         }
//     }
// })


export const userSlice = createSlice({
    name: 'Login',
    initialState: {
        // String akare nite chai bole Json e convert kora lagbe. Jodi oitakey convert kore tahole parse korte hobe. Parse mane string theke abar object e convert kora ke bole. Local Storage theke jodi data delete kori tahole redux eo data delete hobe
        loggedIn: localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : null,
    },
    reducers: {
        Loginusers:(state, action)=>{
            state.loggedIn = action.payload;

        }
    }
})


export const{ Loginusers} = userSlice.actions;
// ekhane ami distructure korsi. Loginusers ke userSlice er actions theke export korsi 
export default userSlice.reducer;
// ekhane userSlice ebong reducer er shokol data ke export korbo. ei reducer hocche userslice er shomosto properties