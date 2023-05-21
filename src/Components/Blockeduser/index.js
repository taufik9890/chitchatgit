import React, { useEffect, useState } from 'react'
import './style.css'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const Blockeduser = () => {
  const db = getDatabase();
  const user = useSelector((users)=>users.login.logins.loggedIn)


  // block e boshanor jonno firebase theke read korbo. Tai useeffect niye ashbo
  // last time jehitu ekta problem e porsilam jokhon val() takey push kortesilam error dicchilo tai id laguk ki na laguk push korte hobe. 
  // let blockArr naamer ekta array banabo jekhane faka array store hobe. tarpor snapshot e foreach kore item naamer ekta parameter diye arrow function chalabo. THen blockarr te push korbo shomosto item.val() ke spread kore ar id er bhitore item.key(id) takeo push korbo. 
  // Ebar blockArr ke console.log korbo dekhar jonno oitate id shoho item dicche kina 
  // er pore useState nibo jekhane useState er moddhe faka array boshbe 
  // Tarpor blockUser ke map kore (item, i) kore shob spread kore dibo 
  // ekhane arek way te try korse. ekhane item.val().blockedbyid == user.uid jodi mile tahole block.Arr te khali id, block ar blockid push kora jabe ar jodi sheta na hoy tahole else e dekhabe blockArr.id,blockedby, ar blockedbyid ke push korte hobe

  const [blockUser, setBlockuser] = useState([])
  useEffect(()=>{
    const starCountRef = ref(db, 'block');
    onValue(starCountRef, (snapshot) => {
      // console.log(snapshot.val());
      let blockArr = []
      snapshot.forEach((item)=>{
        if(item.val().blockedbyid == user.uid){
          // blockArr.push({...item.val(), id: item.key})
          blockArr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid

          })

        }
        else{
          blockArr.push({
            id: item.key,
            blockedby: item.val().blockedby,
            blockedbyid: item.val().blockedbyid

          })

        }
        
        
      })
      console.log(blockArr);
      setBlockuser(blockArr);
    });
  },[])
  console.log(blockUser); 



  // Unblock 
  // EKhane sir er dekha moto Friends er list e ami rakbo kintu ashole ami userlist e pathate chacchi. Er jonno ami duitai banabo
  // handleUnblock naame ekta click event chalabo jekhane item naamer parameter pass korbo. ar item er bhitore shob blocked id er information
  //ekhane friends e rakte chaile friends e kibhabe add korsilam oibhabe add kora lagbe 
  //tai friends e set kore push korbo db er bhitore friends naamer folder e
  //sendername: item.block, senderid: item.blockid, e item.blockname ar id rakbo mane je block khaisilo. ar recieverid te set korbo login user (user.uid) mane je block korsilo
  const handleUnblock =(item)=>{
    set(push(ref(db, 'friends')),{
      sendername: item.block,
      senderid: item.blockid,
      recieverid: user.uid,
      recievername: user.displayName
    }).then(()=>{
      remove(ref(db, 'block/' + item.id))
    })
  }



  return (
    <>
    <div className="blockeduser">
      <div className="blockeduser_header">
        <h3>Blocked Users</h3>
      </div>
      
      <div className="blockeduser_div">
      {
        blockUser.map((item,i)=>{
          return(
<div className="blockeduser_wrapper" key={i} >
                    <div className="blockeduser_photo">
                        <picture>
                            <img src="images/pro_pic.png" alt="" />
                        </picture>
                    </div>
                    <div className="blockeduser_name">
                        <h3>{item.block}</h3>
                        <h3>{item.blockedby}</h3>
                    </div>
                     {/* Ekhane dekhacche blockedbyid jodi na thake tahole unblock er option dekhaba. Mane je block khaise o jodi blocked obosthay thake taholei unblock er option diye hobe  */}
                    
                      {
                        !item.blockedbyid && <div className="blockeduser_btn"> <button type='button' onClick={()=>handleUnblock(item)}  >Unblock</button> 
                        </div> 
                      }
                        
                    </div>
                    )
        
      })
      }
      
       
      </div>
        
    </div>
      
    </>
  )
}

export default Blockeduser
