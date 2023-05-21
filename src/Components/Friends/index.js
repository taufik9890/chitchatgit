import React, { useEffect, useState } from 'react'
import './style.css'
import { getDatabase, onValue,  push,  ref,  remove,  set } from 'firebase/database'
import { useSelector } from 'react-redux';

const Friends = () => {



    const db = getDatabase();
    const user = useSelector((users)=>users.login.logins.loggedIn)








// EKhon jehitu database theke read kore frontend e friend er list dekhabo tahole useeffect use korbo.
// EKhane ...item.val() ke frndArr te push kore dibo. oikhane id te item.key ke set kora lagbe 
const [frndlist, setFrndlist] = useState([])
    useEffect(()=>{
        const starCountRef = ref(db, 'friends');
        onValue(starCountRef, (snapshot) => {
          let frndArr = []
          snapshot.forEach((item)=>{
            frndArr.push({...item.val(), id: item.key})
          })
          setFrndlist(frndArr)
    
      });
    },[])


    // const handleUnfriend =(item)=>{
    //     remove(item.val())

    // }

    // Block user 
    // Ekhane jeita bujhaise je ekhane login(user.uid) korse shey ar je request send(item.senderid) korse  jodi equal hoy tahole blocklist er ekta collection banano hobe. Er jonnoi set kore push korbo. Push korbo karon notun unique ekta id generate kort hobe er pore database e block naamer folder banabo. Tar pore block, blockid, blockedby, blockedbyid naamer variable dhorbo jekhane item theke reciever theke data bhorbo. Ar din shesh block er collection toiri hoise. Kintu jokhon block korbo tokhon oita friendlist theke ber hoye blocked list e chole jabe. 
    // Toh jokhon block korbo then functionality chalay remove korbo db er ref e friends Theke. Database theke id dhorte hobe jeta upore show korbe.
    // frndlist.map((item, i) jokhon map korlam oikhanei shob item pacchi. Shobar agey push kore distructure kore pathaite hoy. Tarpor oikhan theke id takey dhorbo
    // Ekhon jodi sender theke block na hoy tahole reciever er block block howar kotha. er jonno else e kaaj korte hobe
    // Tahole uid ar senderid jodi mile that means senderid theke block dicche. So ekhon if diye jodi senderid na hoy tahole recieverid theke hocche? er jonno else e same code hobe khali reciever er jaygay sender ar sender er jaygay reciever thakbe


    const handleBlock = (item)=>{
        if (user.uid == item.senderid){
            set(push(ref(db, 'block')), {
                block: item.recievername,
                blockid: item.recieverid,
                blockedby: item.sendername,
                blockedbyid: item.senderid

            }).then(()=>{
                remove(ref(db, 'friends/' + item.id))
            })
        }
        else{
            set(push(ref(db, 'block')), {
                block: item.sendername,
                blockid: item.senderid,
                blockedby: item.recievername,
                blockedbyid: item.recieverid

            }).then(()=>{
                remove(ref(db, 'friends/' + item.id))
            })
        }
    }
    
 
  return (
    <>
    <div className="friends">
        <div className="friend_header">
            <h3>Friends</h3>
        </div>
        <div className="friend_div">
            {/* shudhu recievername dile hobe na. tahole je accept korse tar id te shey nijeo friend er moddhe pore thakbe. Tai je login ase or id te dekhabo onnoder naam. Er jonno redux theke use selector chalabo. Tahole je login korse(user.uid) ar  item.senderid jodi same hoy tahole item.recievername dekhaba ar nahole item.sendername dekhaba. 
            2. unfriend pura id ta friendlist theke gayeb hoye 
            3. je block korse shudhu shei unblock korte parbe.  */}
            {
                frndlist.map((item, i) =>(
                    <div className="friend_wrapper" key={i}>
                    <div className="friends_photo">
                        <picture>
                            <img src="images/pro_pic.png" alt="" />
                        </picture>
                    </div>
                    <div className="friend_name">
                        <h3>{user.uid == item.senderid? item.recievername : item.sendername}</h3>
                    </div>
                    <div className="friend_btn">
                        <button type='button' >Unfriend</button>
                        <button type='button' onClick={()=>handleBlock(item)} >Block</button>
                    </div>
                    </div>
                     
                ))
            }
           
        </div>
    </div>
      
    </>
  )
}

export default Friends
