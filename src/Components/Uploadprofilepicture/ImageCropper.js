import React from 'react'
import Cropper from "react-cropper";
// import './style.css'
import { AiOutlineClose } from 'react-icons/ai';
import Button from '@mui/material/Button';

const ImageCropper = ({image, setCropper, setImage, cropData, getCropData}) => {
    console.log(image);
  return (
    <>
    <div className="crop_image_box">
        <div className="upload_header">
            <h4>Upload Your Profile Picture</h4>
            <div className="close" onClick={()=>setImage()}>
                <AiOutlineClose/>
            </div>
        </div>
        <div className="preview_photo">

        <div
            className="img-preview"
          />
        </div>
        <div className="crop_images">
        <Cropper
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} 
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
        </div>

        <div className="upload_btn" onClick={getCropData}>
            {/* ei button e click korle amar data shob get korbe crop korar por  */}
      <Button variant="contained">Upload Now</Button>
        
        </div>
        
        </div>
    
    {/* Firebase e kono media file rakte hoy tahole Firestore e rakha lage  */}

    
      
    </>
  )
}

export default ImageCropper
