import React, { useEffect, useState } from 'react'
import './style.css'
import { getDatabase, onValue, ref } from 'firebase/database';

const Msggrp = () => {


  
  const db = getDatabase();
  const [msggrp, setMsggrps] = useState([])

  useEffect (()=>{
    const starCountRef = ref(db, 'groups');
    onValue(starCountRef, (snapshot) => {
      let msggrpArr = []
      snapshot.forEach((item)=>{
        
        msggrpArr.push({...item.val(), id: item.key})
      })
      setMsggrps(msggrpArr)

  });
  },[])


  // ekhon jehitu groups e values boshabo tar jonno read kora lagbe. Ar etar jonno useEffect use korbo amra    

  return (
    <div>
        <div className='msggrp'>
        <div className="msggrps_header">
            <h3>All Groups</h3>
        </div>
        {
          msggrp.map((item,i)=>(
            
        <div className="msggrps_wrapper" key={i}>
        <div className="msggrps_img">
          <picture>
            <img src="images/pro_pic.png" alt="" />
          </picture>
        </div>
        <div className="msggrps_name">
          <h4>{item.groupname}</h4>
          <h3>{item.grouptag}</h3>
        </div>
        <div className="msggrps_btn">

          <button type='button' >Message</button>
        </div>

      </div>
          ))
        }
        </div>
      
    </div>
  )
}

export default Msggrp
