import React, { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import Container from '@mui/material/Container';
import HashLoader from "react-spinners/HashLoader";
import Grid from '@mui/material/Grid';
import './style.css';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { TfiEye } from 'react-icons/tfi';
import { FaRegEyeSlash } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'; 
// import { useFormik } from 'formik';
// import { getAuth, createUserWithEmailAndPassword,sendEmailVerification  } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signin } from '../../validation';
import { Loginusers } from '../../features/Slice/LoginSlice';
// CTRL + C diye server off kore 
const Login = () => {
    // Authentication er part hocche login ar registration. Er pore database er kaaj thakbe. Ekbar registration korle database e oita save thake
    // Amra kokhon database e user gulake pathabo? Jokhon registration kora hobe er pore 

  
  const [showPass, setShowpass] = useState('password')
  const [loading, setLoading] = useState(false)
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleShowpass = () =>{
    // console.log('asi');
    if (showPass == 'password'){
        setShowpass('text')
    }
    else{
        setShowpass('password')
    }
    // if(showPass == 'password'){
    //     setShowpass == 'text'

    // }
    // else{
    //     setShowpass == 'password'
    // }
}


  const googleprovider = new GoogleAuthProvider();
//   const facebookprovider = new FacebookAuthProvider();
//   const handleGoogle =()=>{
//     signInWithPopup(auth, provider)
//   }


  const initialValues = {
    email: '',
    password: '',
}
// Formik e user create korar pore then console.log korte hobe 
// AUthentication e real time hoy na. Etake firebase e ekbar load dite hoy 
// Action er maddhome data ke pathabo. Action takey trigger korar jonno dispatch hook ke call korte hobe 
// Javascript er inbuilt ekta local storage
// Ei localStorage javascript ee delay. Ar ekhane item set korbo 2 ta parameter through te 

const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signin,
    onSubmit: ()=>{
        setLoading(true)
        signInWithEmailAndPassword(auth, formik.values.email, formik.values.password).then(({user})=>{
            console.log('ami asi');
            // EKhane user ke distructure kore neya lagbe 
            dispatch(Loginusers(user))

            localStorage.setItem('users', JSON.stringify(user))
            // prothom users ta hocche ekta naam
            // localStorage kokhono data shorashori store korte pare na. Era kokhono json ke show korabe. browser e jai render hoy na keno json akare render hoy. Json ekta object. so localstorage shorashori oikhane json ke object akare storage e boshaite pare na.
            // stringify er kaaj ta hocche oitake string kore dibe. Localstorage shorashori json object ke store kore rakte pare na. Tai oitake string kore rakbe. EKhon jei data gula redux e pacchilam sheta ekhon local storage e pacche. SO reload dile ei data redux e thake na. kintu local storage e thik ee ase. Redux data mone rakhe na. Local stora mone rakhe
            navigate('/')
            // console.log(user.user);
            setLoading(false)
        }).catch((error)=>{
           console.log(error.code);
        })
    }
})

// console.log(formik);


// Google Auth 
const handleGoogle = ()=>{
    signInWithPopup(auth, googleprovider).then(()=>{
        navigate('/')
        console.log('hoise');
    })
}
// auth/user-not-found

  return (
    <>



<Container fixed>
        <ToastContainer></ToastContainer>
      <Grid className='box' container spacing={10}>
        
        <Grid item xs={6}>
            <div className='signup-img'>
                <picture>
                    <img loading='lazy' src="./images/signin.png" alt="" />
                </picture>

            </div>
            {/* React e shorashori public er folder ke mention kora lage na. Shorashori  public ke dhorbe */}

            {/* AUthentication hocche login/Registration ke bole. Jemon email same thakle ar korte dibe na. like validation er moto. 
            Ar Authorization hocche apni ki valid user naki hacker or bot egular jonno use kore  */}
        </Grid>
        <Grid item xs={6}>
            <div className='forms'>
                <div className="avatar">
                    <picture>
                        <img loading='lazy' src="./images/avatar.png" alt="avatar" />
                    </picture>
                </div>
                <div className='reg-header'>
                    <h2>Login to your account!</h2>
                </div>
                <div className="google-authentication" onClick={handleGoogle}>
                    <div className="auth_pic">
                        <picture>
                            <img src="./images/google.png" alt="google" />
                        </picture>
                    </div>
                    <div className="auth_text">
                        <h4>Login with Google</h4>
                    </div>

                </div>
                <div className='input-form'>
                    <form onSubmit={formik.handleSubmit} >
                    
                    <TextField name='email' type='email' className='input-des'  label="Email" variant="standard" onChange={formik.handleChange} value={formik.values.email} /> 
                    {
                        formik.errors.email && formik.touched.email ? <p className='errorcls' >{formik.errors.email}</p> : null
                    }
                    <div className='passhow'>
                    <TextField name='password' type={showPass} className='input-des'  label="Password" variant="standard" onClick={handleShowpass} onChange={formik.handleChange} value={formik.values.password}  /> 
                        {
                            formik.errors.password && formik.touched.password ? <p className='errorcls' >{formik.errors.password}</p> : null
                        }
                    <div className='eyes' onClick={handleShowpass}>
                    {
                        showPass == 'password'? <TfiEye/> : <FaRegEyeSlash fill='red'/>
                    }
                    </div>
                    
                    </div>
                     
                    {/* id takey delete korbo kintu variant ke korbo na  */}
                    {/* {
                        loading? (<Button disabled type='submit' className='btn' variant="contained"><HashLoader size={30} /></Button>) :
                        (<Button type='submit' className='btn' variant="contained">Sign up</Button>)
                    } */}

                    {
                        loading? <Button disabled type='submit' className='btn' variant='contained'><HashLoader size={30} /></Button>:
                        <Button type='submit' className='btn' variant='contained'>Sign In</Button>
                    }
                    </form>
                    <div className='links'>
                        <div className="forgetpass">
                        <Link to='/forgetpassword'>Forgot Password?</Link>
                        </div>
                        <p>Don't have an account ? <Link to='/registration'>Sign In</Link> </p>
                    </div>
                </div>

            </div>
        </Grid>
      </Grid>

      </Container>

    {/* <form >
      <input type="email" placeholder='Email' /> <br />
      <input type="password" placeholder='Password' />
      <button type='button' onClick={handleGoogle}>Sign in with Google</button>
    </form> */}
    </>
  )
}

export default Login
