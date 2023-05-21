import React, { useEffect, useState } from 'react'
// import { FaPlus } from 'react-icons/fa';
import './style.css'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

import { AiOutlineSearch } from 'react-icons/ai';


const Userlist = () => {

    const [userlists, setuserlists] = useState([])
    const db = getDatabase();
    const user = useSelector((users)=>users.login.Logins.loggedIn)
    // redux ke anar jonno useSelector hooks use korte hobe 

    // Login user ar userlist er user jodi same hoy oi jaygay atkaite hobe. User id ar login id jodi ek hoy tahole ami push korbo na
    // Ekhon jodi redux er user.uid ar userlists.key etar shathe jodi not equal hoy tokhoni  userarr.push({  ...userlists.val(),  id: userlists.key}) etake push korbe.
    // Jehitu amar userlists e shomosto user er value dawa chilo even login user er o value thakbe. Er jonnoi condition chalano hoise jodi redux er user jodi userlists er shathe equal na hoy taholei userarr te userlist er value ke push korba 
    
    useEffect(()=>{
        const starCountRef = ref(db, 'users');
onValue(starCountRef, (snapshot) => {
    const userarr = [];
    snapshot.forEach((userlists)=>{
        if(user.uid != userlists.key){
            userarr.push({  ...userlists.val(),  id: userlists.key})
        }
    });
    setuserlists(userarr)
});
    },[])









    
    // console.log(userlists);
    // Send Request
    // EKjon user er kache jokhon Friend request jay tokhon as a full stack developer amake kintu mathay rakte hobe jokhon ami request ta pathacchi tokhon 1. ke request pathacche tar naam, 2.  ke request pathacche tar id, 3. kake request pathacche tar naam, 4. Ar kake request pathacche tar id. ei 4 ta jinish amader must be dorkar 
    // user er uid ar authentication er uid same hote hobe 
    // Database theke id gula ke jokhon niye ashbe so front end hishabe dhorte hoile dhorte hobe item.key
    // Value ke access korte hoile val() likte hoy. id gulake access korte hoile key use kora lage 
    // Firebase er id gula ke access korte hoile ei key naamer method ta use korte hobe 
    // ekhane push method use korbo karon kon user kake send request kortese eta ekta id te dekhanor jonno push method use korte hobe 
    const handleSendRequest = (item)=>{
        set(push(ref(db, 'friendrequest')), {
            sendername: user.displayName,
            senderid: user.uid,
            recievername: item.username,
            recieverid: item.id,
          });
    }

    // SHow friend request 
    // Ek user theke send request pathaite hoile arek user e request send hobe. Er agey arekta kaaj korte hobe. Jokhon send request dibo tokhon send request er jaygay cancel request ashbe     
    // Send request dile database e information gese ar oi database theke abar read kore frontend e dekhano lagbe 
    // Friendrequest er data ta read korte hobe. 
    // Jehitu ebar friendrequest er collection theke antese er jonno useEffect e users er bodole friendrequst dite hobe
    // Alhabib jodi Belele ke send request pathay tahole Alhabib 2 bar friendrequest pathaite parbe na. Abar Alhabib jodi Belele ke friendrequest pathay tahole belele abar palta friend request pathaite parbe na karon tokhon Alhabib already belele er request e jhule ase
    // reqArr er array te item.val().recieverid takey push korbo 
    //recieverid ar senderid er ekshathe push kora lagbe
    // recieverid ar senderid jog korar reason hocche 
    // Alhabub jokhon belele ke request pathay tokhon ekrokom id ashe. Ar belele jokhon Alhabib ke request pathay tokhon arek id ashe 
    // frndreq.includes er includes ekta function jeta ekta array ba string er moddhe kono value include ase naki sheta dekhaba 
    // includes er moddhe item.id theke ekta id pacchi jekhane map theke ekta id pacchi. abar user.id ei duita theke ami arekta id pacchi jeta login kore rakse 
    // snapshot er forEach er moto item.id + user.uid othoba frndreq er includes er moddhe user.uid + item.id hoye thake tahole cancel request dekhabe. karon same time e duitar id toh thkabe na


    // 
    useEffect(()=>{
        const starCountRef = ref(db, 'friendrequest');
        onValue(starCountRef, (snapshot) => {
            let reqArr = []
            snapshot.forEach((item)=>{
                reqArr.push(item.val().recieverid + item.val().senderid)
            })
            setFrndreq(reqArr)

        });

    },[])
    const [frndreq, setFrndreq] = useState([])
    // console.log(frndreq);


    // userlists button difference 
    useEffect(()=>{
        const starCountRef = ref(db, 'friends');
        onValue(starCountRef, (snapshot) => {
            let frndArr = []
            snapshot.forEach((item)=>{
                frndArr.push(item.val().recieverid + item.val().senderid)
            })
            setFrndlist(frndArr)
      
        });
    },[])
    const [frndlist, setFrndlist] = useState([])
    // console.log(frndlist);


    // frndrequest accept korar ag porjonto array te kono values dhukchilo na. Array faka chilo. EKhane just id takey dhore push kore dise 





    // searchbar e onchange event niye oitate console.log korbo asi. Ekhane kichu change hoile event console e dekhabe 
    // handleSearch er parameter hishabe e dibo karon e tei notun na added hoy shob dekhay.
    // Toh ami jai ee searchbar e likhi na keno egula  shob ekekta array te store korbo 
    // EKhon specific kichu search korte chaile filter kora lage 
    // Filter kono function na borongcho filter ekta method 
    // Filter hocche onekgula product theke cheke jegula proyojon oigula ke notun ekta array te boshabe  
    // userlist er array ke ene filtering korbo ar filter korar shomoy arrow function use korte hoy. oitar bhitore item naamer parameter dibo. ekhon item ke console.log korle 
    
    // tolowercase() er kaaj hocche keo jodi boro haather letter e search kore tahole Javascript behind the scene choto te convert kore search korbe. tolowercase() hocche upercase othoba lowercase shob gula ke easily match koraite parbe  

    // EKhon search korar shomoy if condition run korbo. Jodi item.username.tolowercase(). item er moddhe username ja ase eigula ka lowercase e convert korbo tarpore includes e dekbo e.target.value.toLowercase() match kore kina. Jodi thake tahole log kore dekhaba asi. 
    // Search er shomoy same username o thakte pare. Tai search er shomoy oi naamer ekta username ee dekhabe na. Tai emon ekta array nite hobe jekhane same naamer shobgula username joma thakbe 
    // filteruser naamer useState dhorbo ar
    // nameArr er name faka array dhorbo jetate item ke push kore dibo
    // ekhon initially mane shurur dike shob user dekhaite hobe. Pore search korle specific users der dekhabe 
    // if (e.target.value.length == 0){
    //     setFilteruser([])
    // } Eta use korar karon hocche kichu search korle delete kore back korar shomoy shob kichu ager moto jani thake 

    const [filteruser, setFilteruser] = useState([])


    const handleSearch = (e)=>{
        let nameArr = []
        if (e.target.value.length == 0){
            setFilteruser([])
        }
        userlists.filter((item)=>{
            console.log(item);
            if (item.username.toLowerCase().includes(e.target.value.toLowerCase())){
                nameArr.push(item)
                setFilteruser(nameArr)

            }
        })
    }



  return (
    <>
    <div className="userlist">
        <div className="userlisthead">
            <h3>User List</h3>
        </div>
        <div className="search_wrapper">
        <div className='search_icons'><AiOutlineSearch/></div>
        <div className='search_fields'>
            <input onChange={handleSearch} type="text" placeholder='Search here...' />
        </div>


    </div>

   
        {
        // userlist.map((item,i)=>{
<div className="userlist_div">
   
    {  filteruser.length > 0 ?    
        filteruser.map((item,i)=>(
     <div key={i}  className="userlist_wrapper">
             <div className="userlist_img">
                 <picture>
                     <img src="images/pro_pic.png" alt="" />
                 </picture>
             </div>
             <div className="userlist_name">
             {/* {item.username} */}
                 <h3>{item.username}</h3>
             </div>
             <div className="userlist_btn">
                 {/* <FaPlus/> */}
                 {/* userlist er button e 3 ta option thakbe. (send request, cancel request ebong friends) er option thaka lagbe. Jodi Frndlist e item.id + user.uid thake tahole friends hoise dekhe btn e friends dekhabe. Ar jodi friend na thake tahole send request othoba cancel request e thakbe. Jokhon Frndreq e user.uid + item.id thakbe tokhon bujha gese je frndreq pathaise? Jar jonno frndreq pathaise dekhe cancel request button dekhabe. Ar jodi request na pathay tahole send request er button thakbe. Ar slash (/) er karone kaaj kore nai karon userlist or friendlist e toh just ekta friend thakbe na. Tai bhitore jawar proyojon nai. SLash ta tokhon use korbo jokhon folder er bhitore specific kichu niye kaaj korbo. Ar use korbo na jokhon whole folder er kaaj cholbe */}
                 {/* {
                     frndreq.includes(item.id + user.uid) || frndreq.includes(user.uid + item.id ) ? <button type='button' onClick={()=>{handleSendRequest(item)}}>cancel request</button> :
                     <button type='button' onClick={()=>{handleSendRequest(item)}}>send request</button>
     
                 } */}
                 {
                     frndlist.includes(item.id + user.uid) || frndlist.includes(user.uid + item.id) ? (<button type='button' disabled>Friends</button>) : frndreq.includes(item.id + user.uid) || frndreq.includes(user.uid + item.id)? (<button type='button' disabled>Cancel Request</button> ) :(<button onClick={()=>{handleSendRequest(item)}} type='button' >Send Request</button>)
                 }
                 
             </div>
         </div>
              
         // console.log(item.username);
         )) :
   userlists.map((item,i)=>(
    <div key={i}  className="userlist_wrapper">
            <div className="userlist_img">
                <picture>
                    <img src="images/pro_pic.png" alt="" />
                </picture>
            </div>
            <div className="userlist_name">
            {/* {item.username} */}
                <h3>{item.username}</h3>
            </div>
            <div className="userlist_btn">
                {/* <FaPlus/> */}
                {/* userlist er button e 3 ta option thakbe. (send request, cancel request ebong friends) er option thaka lagbe. Jodi Frndlist e item.id + user.uid thake tahole friends hoise dekhe btn e friends dekhabe. Ar jodi friend na thake tahole send request othoba cancel request e thakbe. Jokhon Frndreq e user.uid + item.id thakbe tokhon bujha gese je frndreq pathaise? Jar jonno frndreq pathaise dekhe cancel request button dekhabe. Ar jodi request na pathay tahole send request er button thakbe. Ar slash (/) er karone kaaj kore nai karon userlist or friendlist e toh just ekta friend thakbe na. Tai bhitore jawar proyojon nai. SLash ta tokhon use korbo jokhon folder er bhitore specific kichu niye kaaj korbo. Ar use korbo na jokhon whole folder er kaaj cholbe */}
                {/* {
                    frndreq.includes(item.id + user.uid) || frndreq.includes(user.uid + item.id ) ? <button type='button' onClick={()=>{handleSendRequest(item)}}>cancel request</button> :
                    <button type='button' onClick={()=>{handleSendRequest(item)}}>send request</button>
    
                } */}
                {
                    frndlist.includes(item.id + user.uid) || frndlist.includes(user.uid + item.id) ? (<button type='button' disabled>Friends</button>) : frndreq.includes(item.id + user.uid) || frndreq.includes(user.uid + item.id)? (<button type='button' disabled>Cancel Request</button> ) :(<button onClick={()=>{handleSendRequest(item)}} type='button' >Send Request</button>)
                }
                
            </div>
        </div>
             
        // console.log(item.username);
        ))
    }
   





{/* js er code html e show korte hoile () e dite hoy ar nahole return kora lage  */}
        </div>
        // })
        }
    </div>
    </>
  )
}

export default Userlist
