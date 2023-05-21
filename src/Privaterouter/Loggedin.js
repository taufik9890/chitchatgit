import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

// Ekhane dekhate hobe. AMi jokhon login thakbo na shey jeno konobhabei homepage e na dekhay
// useSelector er kaaj hocche redux er value gulake ekhane niye ashbe
// EKhane duita shorto thakbe. Login na kora porjonto homepage e ashte parbe na. Abar Login kora thakle login page e jete parbe na. 
export default function Loggedinusers(){
    const user = useSelector ((users)=> users.login.logins.loggedIn )
    // ekhane jodi user thake tahole navigate kore niye jaba to 
    return user ? <Outlet/> :  <Login/>
}