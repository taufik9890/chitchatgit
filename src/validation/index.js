import * as Yup from 'yup'
// etate bujhay import korbo shomosto jinish ke as a Yup 
// export default er jaygay ekhon export const korbo 
// oneof diye bujhacche. one of the input from Yup. ar oita array te neya hocche karon ekta collection er moddhe ase je tai. jodi reference e password thake tahole password dekhabe otherwise null dekhaba

export const signup = Yup.object({
    fullname: Yup.string().min(3).max(15).required('Please enter your fullname'),
    email: Yup.string().email().required('Please enter email'),
    password: Yup.string().min(8).required('Please enter your password'),
    confirmpassword: Yup.string().oneOf([Yup.ref('password'),null],'Password must be matched').required('Please insert the password again')
})

export const signin = Yup.object({
    email: Yup.string().email().required('Please enter email'),
    password: Yup.string().min(8).required('Please enter your password'),
})



// export const signup = Yup.object ({
//     fullname: Yup.string().min(3).max(15).required('Please enter your fullname'),
//     email: Yup.string().email.required('Enter your email'),
//     password: Yup.string().min(8).required('Please enter your password'),
//     confirmpassword: Yup.string().oneOf([Yup.ref('password'), null],'Password must be matched').required('Please insert the password again')

// })