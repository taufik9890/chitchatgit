import React from 'react'
import './style.css'
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Button } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Forget = () => {

  const auth = getAuth();

  
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: ()=>{
    sendPasswordResetEmail(auth, formik.values.email).then(()=>{
      console.log('gese');
    }).catch((error)=>{
      console.log(error.message);
    })
  }
  // validationSchema: signin,
}
)
  return (
    <>
    <div className="main_forget_wrapper">
      <div className="inner_forget_box">
        <div className="forget_header">
          <h3>Resest your password</h3>
        </div>
        <div className="forget_pass_body">
          <form onSubmit={formik.handleSubmit}>
          <TextField name='email' type='email' className='input-des'  label="Email" variant="standard" onChange={formik.handleChange} value={formik.values.email} /> 
          <Button type='submit' className='btn' variant='contained'>Reset</Button>
          </form>
        </div>

      </div>

    </div>
    </>
  )
}

export default Forget
