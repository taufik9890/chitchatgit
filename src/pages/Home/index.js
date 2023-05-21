import React from 'react'
// import Popup from '../../Components/Modal';
// import Modal from '../../Components/Modal';
import Grid from '@mui/material/Grid';
import './style.css';
import Searchbox from '../../Components/Searchbox';
import Grouplist from '../../Components/Grouplist';
import Friendrequest from '../../Components/Friendrequest';
import Friends from '../../Components/Friends';
import Group from '../../Components/Group';
import Userlist from '../../Components/Userlist';
import Blockeduser from '../../Components/Blockeduser';
// import { Grid3x3Rounded } from '@mui/icons-material';

const Home = () => {
  return (
    <>
      <Grid container  className="home_pages">
        <Grid item xs={4} className='home_items'>
          <div className="search_box">
            <Searchbox/>
          </div>
          <div className="Group_list">
            <Grouplist/>
          </div>
          <div className="Friendrequest">
            <Friendrequest/>
          </div>
        </Grid>
        <Grid item xs={4} className='home_items'>
          <div className="Friends">
            <Friends/>
            
          </div>
          <div className="Group">
            <Group/>
          </div>
        </Grid>
        <Grid item xs={4} className='home_items'>
          <div className="Userlist">
            <Userlist/>
          </div>
          <div className="Blockedlist">
            <Blockeduser/>

          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
