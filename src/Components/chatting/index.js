import React, { useRef, useState } from 'react'
import './style.css'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { BsPlusLg } from 'react-icons/bs';
import { FaTelegramPlane } from 'react-icons/fa';
import { AiOutlineCamera } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { TfiGallery } from 'react-icons/tfi';
import { MdSettingsVoice } from 'react-icons/md';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ModalImage from "react-modal-image";

const Chatting = () => {

  // EKhane uporer part ar nicher part ta fixed thakbe. 
  // left_text p te inline block ase jeta nijer width baade onno jayga nibe na. Abar arek dike maxwidth 500px dise jekhane o joto boro shorboccho 500px porjonto jete parbe. THen padding jehitu ase text er padding wise jototuk padding dorkar niye nibe
  // Web polishing hocche shob kichu thikthak shundor bhabe guchano ke bole 

  const [open, setOpen] = useState(false)
  // ekhane initial open ta false chilo. click korar pore setOpen ke !open(notopen) kore dibe mane true korbe. open thakle more div ta ashbe. tarpor abar click korle setopen open ke abar  !open(notopen) kore dibe tarpor abar false hobe ar more div gayeb hobe 



  //Camera Capture Function 
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop () {
    console.log('handleCameraStop');
  }


  const [opencam, setOpencam] = useState(false)
  //Plus icon e click korle pura more div open hobe. er jonno options div open korar shaathe shathe pura more div plus camera div open kore feltese. Er jonno camera icon er jonno arekta div banaite hobe jetar bhitore onclick function run hobe



  // onclick event e function jokhon call korbo tokhon arrow function call kore dibo.
  // Jehitu icon e click korbo tahole full gallery ke open korte hobe 
  // tai reference hishabe chooseFile naamer reference nibo jekhane useref e null kore rakbo. er pore onclick e chooseFile.current.click() korle open korbe amar input 
  // const [opengal, setOpengal] = useState(false)
  const chooseFile = useRef(null)



  // EKhon friends er content shob amar chat e ante hobe. jar jonno amar redux use korte hobe . Jodi ami redux use kori both jaygay pabo eki time e




  return (
    <>
    
    <div className="chatting_box">
        <div className="active_user_status">
            <div className="user_image">
                <div className="image"></div>
                <div className="info">
                    <h4>Taufik Mahbub</h4>
                    <span>Online</span>
                </div>

            </div>
            <div className="info_bar">

            <BiDotsVerticalRounded/>
            </div>
        </div>
        <div className="message">
          {/* left message start  */}
          

          <div className="left_msg">
            <div className="left_text">
              <p>Hey my man. What's good?</p>
            </div>
            <span>Today, 2:01pm</span>
          </div>
          {/* left message end */}
          
          {/* Right message start  */}
          <div className="right_msg">
            <div className="right_text">
              <p>I'm doing pretty good, What about you? </p>
            </div>
            <span>Today, 2:15pm</span>
          </div>
          {/* Right message end */}


          

    {/* left message start  */}
          

    <div className="left_msg">
      <div className="left_img">
      <ModalImage
  small={"/images/nature.jpg"}
  large={"/images/nature.jpg"}
/>;
      </div>
            <span>Today, 3:01pm</span>
          </div>
          {/* left message end */}



          
    {/* Right message start  */}
          

    <div className="right_msg">
      <div className="right_img">
      <ModalImage
  small={"/images/nature.jpg"}
  large={"/images/nature.jpg"}
/>

            {/* <img src="/images/nature.jpg" alt="" /> */}
      </div>
            <span>Today, 3:01pm</span>
          </div>
          {/* Right message end */}



          
    {/* Right message start  */}
          

    <div className="right_msg">
      <audio controls></audio>
            <span>Today, 3:01pm</span>
          </div>
          {/* Right message end */}



                

    {/* left message start  */}
          

    <div className="left_msg">
      <audio controls></audio>
            <span>Today, 3:01pm</span>
          </div>
          {/* left message end */}
                

    {/* left message start  */}
          

    <div className="left_msg">
      <video controls></video>
            <span>Today, 3:01pm</span>
          </div>
          {/* left message end */}

          
    {/* Right message start  */}
          

    <div className="right_msg">
      <video controls></video>
            <span>Today, 3:01pm</span>
          </div>
          {/* Right message end */}











          

        </div>
        <div className="message_inputs">
          <div className="text_inputs">
          <input type="text" />
          <div className="options" >
            <div onClick={()=>setOpen(!open)}>

          <BsPlusLg/>
            </div>
          {
            open &&  <div className="more">
              <div className="camera" onClick={()=>setOpencam(true)}>
                <AiOutlineCamera/>
              </div>
              <div className="gal"  >
                <div onClick={()=>chooseFile.current.click()} >
                <TfiGallery/>
                  <input type="file" hidden ref={chooseFile} />

                </div>
              </div>
              <div className="voice" >
                <MdSettingsVoice/>
              </div>
            </div>
          }
          </div>
          </div>
          <button type='button'>
            <FaTelegramPlane/>
            
          </button>
        </div>
        {
                  opencam && <div className="capture_img">
                    <div className="close" onClick={()=>setOpencam(false)}>
                      <ImCross/>
                    </div>
                    <Camera
                  onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                  onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
                  onCameraError = { (error) => { handleCameraError(error); } }
                  idealFacingMode = {FACING_MODES.ENVIRONMENT}
                  idealResolution = {{width: 640, height: 480}}
                  imageType = {IMAGE_TYPES.JPG}
                  imageCompression = {0.97}
                  isMaxResolution = {true}
                  isImageMirror = {false}
                  isSilentMode = {false}
                  isDisplayStartCameraError = {true}
                  isFullscreen = {false}
                  sizeFactor = {1}
                  onCameraStart = { (stream) => { handleCameraStart(stream); } }
                  onCameraStop = { () => { handleCameraStop(); } }
                />
                  </div>
                }
    </div>

    
          {/* left message start  */}
          {/* left message end */}
       
    </>
  )
}

export default Chatting
