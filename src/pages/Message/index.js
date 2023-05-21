import React from 'react'
import './style.css'
import { Grid } from '@mui/material'
import Msggrp from '../../Components/Msggrp'
import Friends from '../../Components/Friends'
import Chatting from '../../Components/chatting'
// import Chatting from '../../Components/chatting'

const Message = () => {


    // home theke redirect kore jodi message e jete hoy tahole navigate kora lagbe 
    // Jehitu amader click kore navigate korte hobe tai sidebar e click korte hobe 
    // Jei group e asi shetao dekhabe. Jei group e nai oitao dekhabe. Realtime database e shomosto group jegula ase shob collection ekhane dekhabe 
    // shomosto group jegula ase egula ekhane group e rakha hobe 
    // Jehitu amar notun group niye kaj korbo tai ekhane alada bhabe banaite hobe. tai Msggrp naamer notun component banabo 



  return (
    <div>
      <Grid container justifyContent='space-between'  marginTop={2} >
        <Grid item xs={4} className='msg_items'>
          <Msggrp/> 
          <Friends/>
          
        </Grid>
        <Grid item xs={7} >
          <Chatting/>

        </Grid>
      </Grid>
    </div>
  )
}

export default Message
