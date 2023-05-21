import React from 'react'
import Sidebaricon from './Sidebaricon'
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLogout } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import './style.css'
import { Loginusers } from '../../features/Slice/LoginSlice';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import Popup from '../Modal';


const Sidebar = () => {

// shudhu localStorage theke delete korle logout hobe na. tokhon ekta reload dite Hoy. Tai redux thekeo delete kora lage 
// Ekhon redux theke remove korte hoile action use kora lage jar jonno dispatch kora lagbe. Action ke trigger korar jonno dispatch ke trigger kora lage 
//loginusers e null kore dilei logout hoye jay
/* Redux theke data ante hole useSelector use korte hobe. useSelector er maddhome ami redux er value gula access korte pari */


const [open, setOpen] = React.useState(false);
const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((user)=>user.login.Logins.loggedIn
    )
    const auth = getAuth();
    const handlelogout = ()=>{
        signOut(auth).then(()=>{
            localStorage.removeItem('users')
        dispatch(Loginusers(null))
        navigate('/')
        }).catch((error)=>{
            console.log(error.message);
        })
        

    }
    const handleOpen =()=>{
        setOpen(true)
    }


  return (

    <>
    <div className='sidebar'>
        <div className="sidebar_wrappers">

<div className="profile_head">
<div className="profile_picture" onClick={handleOpen}>
                <picture>
                    <img src={users.photoURL} alt="" />
                </picture>
                <div className="overlay">
                    <AiOutlineCloudUpload/>
                </div>
            </div>
            <div className="username">
                <h4>{users.displayName}</h4>
                </div>
</div>
            

            <div className="other_pages">
                <Sidebaricon/>
            </div>
            <div className="logout" onClick={handlelogout}>
                <MdOutlineLogout/>
            </div>
        </div>
        
    </div>
    <Popup open={open} setOpen={setOpen}/>

      
    </>
  )
}

export default Sidebar
