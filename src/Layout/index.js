import React from 'react'
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import './style.css'

// Rootlayout thakbe karon jei jinish shob page e common thakbe dekhe rootlayout bola hobe 
// Jeta unchangeable oitake rootlayout e rakbo. Ar jeta changeable oitake outlet e rakbo
// Ebar sidebar er jonno ami arekta component dhorbo 

const Rootlayout = () => {
  return (
    <>
    <div>

     <Grid container>
        <Grid  xs={1} >
          <Sidebar/>
        </Grid>
        <Grid  xs={11}>
          <Outlet/>
        </Grid>
      </Grid>
    </div>
      
    </>
  )
}

export default Rootlayout
