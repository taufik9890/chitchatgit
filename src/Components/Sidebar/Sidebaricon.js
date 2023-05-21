import React from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import { BsGear } from 'react-icons/bs';
import { IoIosNotifications } from 'react-icons/io';
import {  NavLink } from 'react-router-dom';
import './style.css'





const Sidebaricon = () => {


    // link er jaygay Navlink nibo karon oikhane active class thake



  return (
    <>
    <div className="icons">
 
        
        <NavLink className="sidebar_icon" to='/'>
            <AiOutlineHome/>
        </NavLink>
        <NavLink className="sidebar_icon" to='/message'>
            <FaRegCommentDots/>
        </NavLink>
        <div className="sidebar_icon">
            <IoIosNotifications/>
        </div>
        <div className="sidebar_icon">
            <BsGear/>
        </div>
    </div>
      
    </>
  )
}

export default Sidebaricon
