import React, { useRef, useState } from 'react'
import './style.css'
import { FaImage } from 'react-icons/fa';
import ImageCropper from './ImageCropper';
import "cropperjs/dist/cropper.css";
import { getStorage ,ref, uploadString,  getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { Loginusers } from '../../features/Slice/LoginSlice';



const Uploadprofile = ({setOpen}) => {
  const [image, setImage] = useState()
  // const [image, setImage] = useState([]) profile picture e ektai pic use kore dekhe array ney na. kintu multiple photos thakle array ney  
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  // Ei state gula shob index.js e rakha hocche karon parents er kache shob components thakle child rao pabe 
  const choosefile = useRef(null);
  const auth = getAuth();
  const dispatch = useDispatch();
  const users = useSelector((user)=>user.login.Logins.loggedIn
    )



  
const storage = getStorage();
const storageRef = ref(storage, users.uid);
// console.log(users);
  // console.log(choosefile);
  const handleUploadPic =(e)=>{
    e.preventDefault()
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    }
    else if (e.target) {
      files = e.target.files;
    }
    // Jodi e.dataTransfer e kono file thake tahole files er moddhe e.dataTransfer e files save korbe
    // ar jodi else if e e.target e kono data thake tahole oikhane data save korba or select korbe
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    // Amar joto type er media file thakbe oikhane ekta reader thakbe. Ar ei reader kono react er reader na. Eta Javascript theke ashbe.
    // Ar egula shob hocche file reader 
    // EKhane reader naame ekta variable nise ar oikhane FileReader naame ekta constructor nise. notun kore ekta file input kortese dekhe ekhane new likse. jaate new kore fileReader banabe 
    // reader.onload e bujhay file gula read howar shomoy ekta load howar pore ki korbe 
    // setImage(reader.result) Tarpor read korar por je result ta ashbe oita setImage e set kore dite hobe 
    // reader.readAsDataURL(files[0]) Database jekono Image ke url diye save kore. Ar files er pashe array ta hocche index er moddhe prothom index takey niye kaaj/crop korbe 
  }
  // useRef hooks shorashori dom ke access korte pare. input ta ekta dom so oita ke access korte parbe. useRef er maddhome ami modal er onek kichu korte pari. like Modal er baire click korle auto close kore fele 
  // onClick korle choosefile korbe ar oitar bhitore je current ta ase oitate click korle input tai ashbe
  // preventDefault er kaaj hocche input e jokhon click kori browser e default bhabe ekta load ney 
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      // Data URL string
const message4 = cropper.getCroppedCanvas().toDataURL();
uploadString(storageRef, message4, 'data_url').then((snapshot) => {
  getDownloadURL(storageRef).then((downloadURL) => {
    updateProfile(auth.currentUser, { photoURL: downloadURL,
    }).then(()=>{
      setOpen(false)
      dispatch(Loginusers({...users, photoURL: downloadURL}))
      localStorage.setItem('users', JSON.stringify({...users, photoURL: downloadURL}))
    })
  });
});
    }
  };
  // EKhane jeta bujhaise jodi cropper er type of undefined na thake tahole cropper theke getCroppedCanvas theke dataurl e boshaba.
  // Storage er khetre data ke firebase agey download kore tarpor browser e show kore 


  return (
    <div className='upload_box'  >
      <input type="file" hidden ref={choosefile} onChange={handleUploadPic} />
      <div className="upload_logo" onClick={()=>choosefile.current.click()} >
        <FaImage/>
        </div>
      <div className="upload">

        
      <div className="upload_head">
  
        <h1>Upload Photo</h1>
      </div>
      {/* {image && <ImageCropper/>} */}
      {
        image && <ImageCropper image={image} setCropper={setCropper} setImage={setImage} cropData={cropData} getCropData={getCropData}/>
      }
      {/* && hocche if else er moto khali else nai. Jodi image theke thake tahole ImageCropper use korte hobe  */}
      {/* console e string holey white color e thakbe. kintu string na hole onno color hote hobe  */}
      {/* setImage takey faka kore dile ar ImageCropper er moddhe image ta jabe na. tar mane upload photo te abar ashbe */}
      
    </div>
      
    </div>
  )
}

export default Uploadprofile
