import React from 'react'
import './style.css'
import { AiOutlineSearch } from 'react-icons/ai';

const Searchbox = () => {
  return (
    <>
    <div className="search_wrapper">
        <div className='search_icons'><AiOutlineSearch/></div>
        <div className='search_fields'>
            <input type="text" placeholder='Search here...' />
        </div>


    </div>
    
      
    </>
  )
}

export default Searchbox
