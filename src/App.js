// react niye kaaj korar shomoy main file tar naam thakbe index.js. Abar bhag korar shomoy o index.js thakbe 
// Props dealing serial maintain kore ek jaygar data arek jaygay pathano ke bole
// Child component theke parent component ke kokhono pathaite parbo na react e. Er jonnoi redux use kora hoy.
// State management dui dhoroner ache. Ekta hocche React er inbuilt hooks jetake Usecontext. Arekta ase third party Redux. 
// Choto khato project er jonno Usecontext use korbo. Example Booklist/Todo list/Portfolio er website. Usecontext ke context Api o bole
// Redux hocche state management. Redux ta hocche alada ekta package. Khub boro project er jonno Redux use korte hobe. Example facebook/eccomerce site
// Vanilla redux ekhon beshi use hoy na karon oita raw code er redux chilo. Onek beshi code chilo. Tai ar use kora hobe na
// That's why Redux toolkit use korbo. Redux toolkit choto kintu kaaj kore onek bhalo
// Redux amader 3 ta jinish dey. 1. Action, 2. Reducer, 3. Store. 
// 1. Reducer - Je kaaj korte chay shey hocche Reducer.
// 2. Action - Je kaaj ta kore dibe sheta hocche Action 
// 3. Store - Jekhane shobkichu store thake. Component gula oder shob data ekta jaygay store kore rakhe. Ar oi store thekei shobai access kore nite pare. Individual components theke request kora lage na. EKhane component ar component er moddhe kono connection thaktese na. EKta jaygay store kore rakse oikhan theke shob data nibe
// Storing ta hoy jokhon user er login kora thake. Or shob login information store hoye thake 
// 4. Provider - Je shokol kaaj gula provide korbe 
// Installation er khetre React Redux ta agey install korte hoy tarpor Redux Toolkit use korte hoy. React Redux theke Raw code use kore
// Src te features namey ekta folder create korbo jekhane aro 2 ta folder thakbe. Ektate Reducers thakbe 'Slice' Namer folder e. arektate Store korte hobe shob.
// Slice mane shokol file ke handle kora 

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Rootlayout from "./Layout";
import Forget from "./pages/Forgetpassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Loggedinusers from "./Privaterouter/Loggedin";
import Notloggedinusers from "./Privaterouter/Notloggedin";
import Message from "./pages/Message";



// Ami jodi multiple route chai tahole arekta <Route></Route> banay er bhitore shob route rakbo

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route element={<Loggedinusers/>}>
        <Route element={<Rootlayout/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/message" element={<Message/>}></Route>
        </Route>

      </Route>
      <Route element={<Notloggedinusers/>}>
        <Route path="/registration" element={<Registration/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgetpassword" element={<Forget/>}></Route>
        

      </Route>

    </Route>

  ))
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    
    
    </>
  );
}

export default App;
