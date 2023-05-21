import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database'
const Friendrequest = () => {


  const user = useSelector((users)=>users.login.Logins.loggedIn)
  const db = getDatabase();
  const [frndreq, setFrndreq] = useState([])

// Ekhane item.val().recieverid je friendreq recieve korse shey jodi user.uid jei user ta login korse tar shoman hoy tokhon tar shokol information (...item.val()) ebong tar id (id: item.key) shoho reqArr te push kore diba. 
// Deeply bolte gele je friendrequest pabe(recieverid) ar je login kora thakbe (user.uid) jokhon same thakbe tokhon ee pura item.val() shob information 
// Tarpor oitakey map kore item, i er maddhome ami boshay dibo frontend e. 
// Toh Friendrequest accept korle db te notun database friends naamer folder create hocche 

  useEffect (()=>{
    const starCountRef = ref(db, 'friendrequest');
    onValue(starCountRef, (snapshot) => {
      let reqArr = []
      snapshot.forEach((item)=>{
        if(item.val().recieverid == user.uid)
          reqArr.push({...item.val(), id: item.key})
      })
      setFrndreq(reqArr)

  });
  },[])
  // console.log('req',frndreq);


  // Accept request 
  // Request accept korar pore ekta friend er collection thakbe jei collection e shobgula accepted request er user gula ashbe 
  // Toh friends er moddhe shob item gula jacche tai item takei boshay dite hobe. ekhon item er parameter hishabe data dhorlam. 
  // set(push(ref(db, 'friends')) friends e push korar pore ekhane shokol accepted friends er data ke ante hobe. 
  // JOkhon amar friendrequest accepted hoye gese tokhon ar frndreq list e ar oita dekhano uchit na
  // Tai request accept korar pore then remove korte hobe db er friendrequest folder er data theke jei id (data.id) remove kore dilei oi specific id ta remove hobe
  // Data hocche parameter hishabe dawa hoise. but argument e item ase dekhei kono problem nai 
  const handleAccept = (data )=>{
    // console.log('asi');
    set(push(ref(db, 'friends')), {
      ...data, 
      
    }).then(()=>{
      remove(ref(db, 'friendrequest/' + data.id))
    });

  }



  return (
    <>
    <div className="friendrequest">
        <div className="friendreq_header">
            <h3>Friend Request</h3>
        </div>
        <div className="friendreq_div">
          {
            frndreq.map((item,i)=>(
              <div className="friendreq_wrapper" key={i}>
            <div className="friendreq_img">
              <picture>
                <img src="images/pro_pic.png" alt="" />
              </picture>
            </div>
            <div className="friendreq_name">
              <h4>{item.sendername}</h4>
            </div>
            <div className="friendreq_btn">
              {/* handleAccept e shob item gula ke niye ashlam  */}
              <button type='button' onClick={()=>handleAccept(item)}>Accept</button>
              <button type='button'>Decline</button>
            </div>

          </div>
            ))
          }
        </div>
    </div>
      
    </>
  )
}

export default Friendrequest
