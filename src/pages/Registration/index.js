 import React, { useState } from 'react'
import Container from '@mui/material/Container';
import HashLoader from "react-spinners/HashLoader";
import Grid from '@mui/material/Grid';
import './style.css';
import TextField from '@mui/material/TextField';
import { TfiEye } from 'react-icons/tfi';
import { FaRegEyeSlash } from 'react-icons/fa';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { signup } from '../../validation';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from '../Login';
// Ekta ashtese auth theke 
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification, updateProfile  } from "firebase/auth";
// Arekta ashtese database theke 
import { getDatabase, ref, set } from "firebase/database";
// Ei useFormik use korar pore shomosto validation ashbe 
// shobar agey write data korte hoy 

 
 const Registration = () => {

    const [showPass, setShowpass] = useState('password')
    // const [loading, setLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    // console.log(auth)

    const auth = getAuth();
    const db = getDatabase();
    const navigate = useNavigate();
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
    // console.log(auth)
    // initialValues takey upore declase korbo. initialvalues ke ekta object e rakbo ar ei object tatey shokol state gula rakbo(input er shob state gula thakbe)
    // Konta kon input theke ashtese eta bujhanor jonno name select kora lagbe. Tumi jodi kono kichur value change korte chao tahole formik er deya je handlechange function ase shetakey change korte parba.
    // Expiration time hocche kon time e automatically log out kore deya bole 
    // EK page theke arek page e jawa ke navigate bole 

    const initialValues = {
        fullname: '',
        email: '',
        password: '',
        confirmpassword: '',
    }
// Formik e user create korar pore then console.log korte hobe 
// AUthentication e real time hoy na. Etake firebase e ekbar load dite hoy 

    // Authentication er part hocche login ar registration. Er pore database er kaaj thakbe. Ekbar registration korle database e oita save thake
    // Amra kokhon database e user gulake pathabo? Jokhon registration kora hobe er pore. Agey verification hote hoy tarpor database e data pathay
    // Notun id/username jaate replace na hoy er jonno push use korte hobe. Ar push amake bibhinno individual id dey. Kintu amra push method use korbo na karon database er id ar authentication er id same thake na.
    // Er jonno authentication er id ar database er id milaite hobe 
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: signup,
        onSubmit: ()=>{
            // setLoading(true)
            setLoading(true)
        
            createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password).then(({user})=>{
                console.log(user);
                updateProfile(auth.currentUser, {
                    displayName: formik.values.fullname, 
                  }).then(()=>{
                    setLoading(false)
                    sendEmailVerification(auth.currentUser).then(()=>{
                        // kono kichur bhitore kichu dite hole / diye dite hobe. ar etar shathe concatinate korte hobe user theke uid ashtesilo
                    set(ref(db, 'users/' + user.uid), {
                        username: user.displayName,
                        email: user.email,

                      }).then(()=>{
                        toast.success('Registration is done, Please check your email', {
                            position: "bottom-center",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            });
                        formik.resetForm()
                        
                        setTimeout(()=>{
                            navigate('/Login')
                        },2000)
                        // Registration korar pore database e user gulakke pathabo then toastify run korbe 
                      });
                });

                  })
                
                // setLoading(false)
                // Email verification e amra user ar email niyei kaaj korbo 
                // auth theke amader authentication er shob data ashtese 
                // Short e object ke acces kora kei distructure bole. 
                // Displayname/Profile Picture update login/registration er moddhe pore na. Eta update er moddhe pore.
                // Create user er pore update profile korte hoy.
                //   Displayname ta formik theke pacchi
                
                
                
            // setLoading(false)
                console.log('data gese')
            }).catch(error=>{
                console.log(error.code)
            });
        }
    })

    // console.log(formik);
    // formik ke console.log korle ekta object return korbe. Ar object er bhitore bibhinno dhoroner function thakbe jemon handlesubmit/handlechange formik er joto value pabo tokhon sign up press korlei pabo. Data gulake formik er maddhome access korte parbo.
    // Handlesubmit er kaaj holo o shudhu data submission er kaaj korbe.  Onclick er maddhome formik er bhitore handle submit korle shob values pabo amra. Etar maddhome values dekte parbo amra. 
    // Jokhon onSubmit use korbo tokhon Button er type tao diye dibo submit  
    // Yup form er full validation er kaaj ta access korte dey. Yup chaile ekhaneo validation korte pari kintu best practice hocche alada ekta page khule kora
    // Touched property hocche jei input e ami focus korbo oitake touched bole 
    // Jsx er maddhome ekta component theke arek component ke pathano kei bole props

 
   return (
    <>
    <Container fixed>
        <ToastContainer></ToastContainer>
      <Grid className='box' container spacing={10}>
        <Grid item xs={6}>
            <div className='forms'>
                <div className='reg-header'>
                    <h2>Get started with easily register</h2>
                    <p>Free register and you can enjoy it</p>
                </div>
                <div className='input-form'>
                    <form  onSubmit={formik.handleSubmit} >
                    <TextField name='fullname' type='text' className='input-des'  label="Full Name" variant="standard" value={formik.values.fullnames}  onChange={formik.handleChange} /> 
                    {
                        formik.errors.fullname  ? <p className='errorcls' >{formik.errors.fullname}</p>: null
                    }
                    <TextField name='email' type='email' className='input-des'  label="Email" variant="standard" value={formik.values.email
                    }  onChange={formik.handleChange} /> 
                    {
                        formik.errors.email && formik.touched.email ? <p className='errorcls' >{formik.errors.email}</p> : null
                    }
                    <div className='passhow'>
                    <TextField name='password' type={showPass} className='input-des'  label="Password" variant="standard" value={formik.values.password}  onChange={formik.handleChange} /> 
                        {
                            formik.errors.password && formik.touched.password ? <p className='errorcls' >{formik.errors.password}</p> : null
                        }
                    <div className='eyes' onClick={handleShowpass}>
                    {
                        showPass == 'password'? <TfiEye/> : <FaRegEyeSlash fill='red'/>
                    }
                    </div>
                    
                    </div>
                    <TextField name='confirmpassword' type='password' className='input-des'  label="Confirm Password" variant="standard" value={formik.values.confirmpassword} onChange={formik.handleChange} /> 
                    {
                        formik.errors.confirmpassword && formik.touched.confirmpassword ? <p className='errorcls' >{formik.errors.confirmpassword}</p> : null
                    }
                    {/* id takey delete korbo kintu variant ke korbo na  */}
                    {/* {
                        loading? (<Button disabled type='submit' className='btn' variant="contained"><HashLoader size={30} /></Button>) :
                        (<Button type='submit' className='btn' variant="contained">Sign up</Button>)
                    } */}

                    {
                        loading? <Button disabled type='submit' className='btn' variant='contained'><HashLoader size={30} /></Button>:
                        <Button type='submit' className='btn' variant='contained'>Sign Up</Button>
                    }
                    

                    </form>
                    <div className='links'>
                        <p>Already  have an account ? <Link className='link-color' to='/login'>Sign In</Link> </p>
                    </div>
                </div>

            </div>
        </Grid>
        <Grid item xs={6}>
            <div className='signup-img'>
                <picture>
                    <img loading='lazy' src="./images/signup.png" alt="" />
                </picture>

            </div>
            {/* React e shorashori public er folder ke mention kora lage na. Shorashori  public ke dhorbe */}

            {/* AUthentication hocche login/Registration ke bole. Jemon email same thakle ar korte dibe na. like validation er moto. 
            Ar Authorization hocche apni ki valid user naki hacker or bot egular jonno use kore  */}
        </Grid>
      </Grid>

      </Container>

    </>
   )
 }
 
 export default Registration
 