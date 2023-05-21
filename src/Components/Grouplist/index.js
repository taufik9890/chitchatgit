import React, { useEffect, useState } from 'react'
import './style.css'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';


const Grouplist = () => {



    

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const db = getDatabase();
    
  const user = useSelector((users)=>users.login.Logins.loggedIn)
  

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      
    // grouplist ar my groups er difference hocche my groups e hobe jegula group ami banaisi ar grouplist e boshbe duniyar joto group ase jegulay ami thaki ba onno keo banaise
    // grouplist header e ekta button dibo jekhane click korle new group create korbe. Ar oikhane create korar shomoy new modal open hobe 
    //  click korle handlecreate e set, push ar ref pass korbo groups naamer collection e
    // jehitu  new groupname set korbo tahole onChange kora lagbe.
    // Egular jonno alada alada kore state dhorte hobe 
    
// EKhane group je create korbe oikhaner group gula My Groups e thakbe. 
     const [groupname, setGroupname] = useState('')
     const [grouptag, setGrouptag] = useState('')
      


      const handlecreate =()=>{
        set(push(ref(db, 'groups')),{
          groupname: groupname,
          grouptag: grouptag,
          adminname: user.displayName,
          adminid: user.uid


          }).then(()=>{
            setOpen(false)
          })
      }




      // grouplist e ami onnano group ke rakte chacchi jehitu tai oikhane admin id er shathe jodi user.uid jodi na mile taholei grplistArr te push kore dibo item.val() ar id takey. 


      const[randomgrp, setRandomgrp] = useState([])




      useEffect(()=>{
        const starCountRef = ref(db, 'groups');
        onValue(starCountRef, (snapshot) => {
            let grplistArr = [];
            snapshot.forEach((item)=>{
                if(item.val().adminid != user.uid){
                    grplistArr.push({...item.val(), id: item.key})
                }
            })
            setRandomgrp(grplistArr) 
            // console.log(randomgrp);
// console.log(snapshot);

      });
    },[])


    // ekhane join e click korle notun event run korbe jekhane group e join korar jonno push korbe 
    // Er pore read write er moto notun kore kora lagbe  
    // notun kore push 


    const handlejoingrp = (item) =>{
      set(push(ref(db, 'groupjoinreq')),{
        groupid: item.id,
        groupname: item.groupname,
        grouptag: item.grouptag,
        adminid: item.adminid,
        adminname: item.adminname,
        userid: user.uid,
        username: user.displayName 

        }).then(()=>{
          setOpen(false)
        })
    }






  return (
    <>
    <div className="grouplist">
        <div className="grouplist_header">
            <h4>Group list</h4>
            <div className="grouplist_btn">
                <button onClick={handleOpen}>Create Group</button>
                <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Group
          </Typography>
          
      <TextField onChange={(e)=>setGroupname(e.target.value)} className='grp_inputs' id="outlined-basic" label="Group Name" variant="outlined" fullWidth />
      <TextField onChange={(e)=>setGrouptag(e.target.value)} className='grp_inputs' id="outlined-basic" label="Group Tagline" variant="outlined" fullWidth />
        <Button className='create_btn' onClick={handlecreate}>Create New Group</Button>
        </Box>
      </Modal>
                
            </div>
        </div>
        <div className="grouplist_div">
          { randomgrp.length == 0 ? <Alert severity="error">No groups created yet!</Alert> : 
            randomgrp.map((item, i)=>(
              <div className="grouplist_wrapper" key={i}>
                <div className="grouplist_images">
                    <picture>
                        <img src="images/grouplist1.png" alt="" />
                    </picture>
                </div>
                <div className="grouplist_name">
                    <h3>{item.groupname}</h3>
                    <span>Admin: {item.adminname}</span>
                    <h6>{item.grouptag}</h6>
                <div className="grouplist_btn">
                    <button onClick={()=>handlejoingrp(item)} type='button'>Join</button>
                </div>
                </div>
            </div>

            ))
          }


            

        </div>

    </div>
      
    </>
  )
}

export default Grouplist
