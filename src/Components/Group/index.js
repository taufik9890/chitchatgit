import React, { useEffect, useState } from 'react'
import './style.css'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';

const Group = () => {

// EKhane group je create korbe oikhaner group gula My Groups e thakbe 
// Group er name ar admin my groups e show korbe 
// Ar egula ke show koranor jonno read korte hobe ar er jonno useeffect use kora lagbe 
// Je group create korse sheitai toh admin id tahole admin id ar login(user.uid) jodi mile jay taholei item.val() takey push kora jabe. 
// Er jonnoi loggedIn user ee khali dekte parbe console e 
// Etuku jehitu korte parsi tahole ekta array niye push kore dite parbo 
// Er pore front end e show korar jonno mygrouplist ke map kore item, i diye pass kore dibo 
// Group er pashe info naamer ekta button ar request naamer button dibo 
// Kono group jodi created na thake tahole mygrouplist er length jodi 0 thake(mane kono group nai) tahole alert diye dibo jekhane no groups created hishabe ashbe ar kichu thakle group er naam, tagline ar admin er naam boshay dibo


const db = getDatabase();

const user = useSelector((users)=>users.login.Logins.loggedIn)

const [mygrouplist, setMygrouplist] = useState([])


useEffect(()=>{
        const starCountRef = ref(db, 'groups');
        onValue(starCountRef, (snapshot) => {
            let grpArr = [];
            snapshot.forEach((item)=>{
                if(item.val().adminid == user.uid){
                    grpArr.push({...item.val(), id: item.key})
                }
            })
            setMygrouplist(grpArr)
            // console.log(mygrouplist);


      });
    },[])

// Jehitu ekjon user er group arekjon er grouplist e dekhacche na er jonno 
// Jodi id match na kore user er shathe tahole grouplist e onno id er groups added thakbe 






// ekhon request e click korle handlereqshow namer click function dibo jekhane item tao pass kore dibo. jekhane item ta.
// Show ke first e false dekhabe. SHow jodi true hoy tahole button er moddhe (go back) dekhabe
// goback e abar click korle setshow ke false kore dile abar ager moto hobe 


const [show, setShow] = useState(false)
const [grpreqlist, setGrpreqlist] = useState([])

const handlereqshow =(gitem)=>{
    setShow(true)
    const starCountRef = ref(db, 'groupjoinreq');
    onValue(starCountRef, (snapshot) => {
        let grpreqArr = [];
        snapshot.forEach((item)=>{
            if(item.val().adminid == user.uid && item.val().groupid == gitem.id){
                grpreqArr.push({...item.val(), id: item.key})
            }
        })
        setGrpreqlist(grpreqArr)


  });
    
}



// ebar ekta difference hocche ebar request e click korle useEffect run korbe
// ekhane item.val().adminid jodi user.uid er shathe same hoy taholei grpreqArr te push kore dite hobe item er shob value ke. 
// mygrouplist er lengthjodi zero hoy tahole alert e dekhabe no groups created yet ar nahole show dekhabe jeta request click korar pore (go back) button ashar KeyboardTabSharp. Ar show jodi hoye thake tahole oikhane 'ase' jeta groupreq gula dekhabe ar lekha thakbe ar jodi show na thake tahole normally mygrouplist gula dekhabe 



// ekhon accept e click korle grpreqlist delete hoye oita group er member e eshe porbe 
// accept korar pore groupmembers naamer notun ekta collection banano hobe. Oikhane admin,group, user der id ebong name er collection gula push kore dibo. 
// push korar pore then 


const handleAcceptgrp = (item)=>{
    set(push(ref(db, 'groupmembers')),{
        adminid: item.adminid,
        groupid: item.id,
        userid: item.userid,
        adminname: item.adminname,
        groupname: item.groupname,
        username: item.username

        }).then(()=>{
            remove(ref(db, 'groupjoinreq/' + item.id))
        })
}

// info te click korle setMembershow ke true kore dibe. Er pore membershow jodi true thake tahole (go back) namer button thakbe ar oi button e jodi click kori tahole setMembershow abar false hoye jabe. Tatey abar ager position e ashbe 
// jehitu members der show korabo front end e tahole read korte hobe. jar jonno useEffect use korte hobe  
// ekhon ref hishbabe groupmembers der rakbo. ekhane snapshot e foreach chalabo jekhane item takey pass kore dibo. ekhane if condition chalabo jekhane user.uid jodi groupmembers.adminid jodi same hoy ebong grpmemshow.id jodi item.val().groupid jodi same thake tahole
// membershow jodi theke thake tahole 'asi' dekhaba ar nahole shob groups der dekhaba 



const [membershow, setMembershow] = useState(false)
const [grpmember, setGrpmember] = useState([])
const handlemembershow = (grpmemshow)=>{
    setMembershow(true)
    const starCountRef = ref(db, 'groupmembers');
    onValue(starCountRef, (snapshot) => {
        let memberArr = [];
        snapshot.forEach((item)=>{
            if(user.uid == grpmemshow.adminid && grpmemshow.id == item.val().groupid){
                memberArr.push({...item.val(), id: item.key})
            }
        })
        setGrpmember(memberArr)


  });

  console.log(grpmember);

}

  return (
    <>
    <div className="group">
        <div className="group_header">
            <h3>My Groups</h3>
        </div>
        <div className="group_div">
            {
                        show && <button onClick={()=>setShow(false)} type='button'>go back</button>
                    }
                    {
                        membershow && <button onClick={()=>setMembershow(false)}>go back</button>
                    }
            {mygrouplist.length == 0 ? <Alert severity="error">No groups created yet!</Alert> : show ? grpreqlist.length == 0 ? <Alert severity="error">No group request yet!</Alert> : grpreqlist.map((item, i)=>(
                <div className="group_wrapper" key={i}>
                <div className="group_images">
                    <picture>
                        <img src="images/grouplist1.png" alt="" />
                    </picture>
                    
                </div>
                <div className="group_name">
                    <h3>{item.username}</h3>
                </div>
             <div className="group_btn">
                    <button type='button' onClick={()=>handleAcceptgrp(item)}>Accept</button>
                    <button type='button'>Reject</button>
                </div> 
            </div>
            )) : membershow ? grpmember.map((item,i)=>(
                <div className="group_wrapper" key={i}>
                <div className="group_images">
                    <picture>
                        <img src="images/grouplist1.png" alt="" />
                    </picture>
                    
                </div>
                <div className="group_name">
                    <h3>{item.username}</h3>
                </div>
            </div>
            )) :  mygrouplist.map((item, i)=>(
                    <div className="group_wrapper" key={i}>
                <div className="group_images">
                    <picture>
                        <img src="images/grouplist1.png" alt="" />
                    </picture>
                    
                </div>
                <div className="group_name">
                    <h3>{item.groupname}</h3>
                    <h5>{item.grouptag}</h5>
                    <span>Admin: {item.adminname}</span>
                </div>
             <div className="group_btn">
                    <button type='button' onClick={()=>handlemembershow(item)}>Info</button>
                    <button type='button' onClick={()=>handlereqshow(item)}>Request</button>
                </div> 
            </div>
                ))
               

            }
            
           

        </div>
    </div>
      
    </>
  )
}

export default Group
