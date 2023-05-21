import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Ekhane dekhate hobe. AMi jokhon login thakbo na shey jeno konobhabei homepage e na dekhay
// useSelector er kaaj hocche redux er value gulake ekhane niye ashbe
export default function Notloggedinusers(){
    const user = useSelector ((users)=>
    users.login.logins.loggedIn
    )
    // ekhane jodi user thake tahole navigate kore niye jaba to 
    return user ? <Navigate to='/'/> : <Outlet/>
}