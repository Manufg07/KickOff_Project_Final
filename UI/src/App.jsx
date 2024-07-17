import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";

import LoginPage from "./Pages/User/LoginPage";
import RegisterPage from "./Pages/User/RegisterPage";
import Home from "./Components/User/Home";
import FootballLeagues from "./Components/User/FootballLeagues";
import AdminLoginPage from "./Pages/Admin/AdminLoginPage";
import UserEngagement from "./Components/Admin/UserEngagement";
import MainLandingPage from "./Components/MainLandingPage";
import HomePage from "./Pages/User/HomePage";
import AdminLayout from "./Layout/AdminLayout";
import AdminHomePage from "./Pages/Admin/AdminHomePage";
import ViewUser from "./Components/Admin/ViewUser";
import ViewPost from "./Components/Admin/ViewPost"
import MainLayout from "./Layout/MainLayout";
import AdminRegister from "./Components/Admin/AdminRegister";
import UserLayout from "./Layout/UserLayout";
import UserProfile from "./Components/User/UserProfile";
import Leagues from "./Components/User/Leagues";
import UserForgot from "./Components/User/UserForgot";
import Register from "./Components/User/Register";
import AdminForgot from "./Components/Admin/AdminForgot";
import ChampionsLeague from "./Components/User/ChampionsLeague";
// import '../App.css'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

      <Route path="/" element={<MainLayout/>}>
        <Route index element={<MainLandingPage/>}/>
        <Route path="/admin-login" element={<AdminLoginPage/>}/>
        <Route path="/admin-register" element={<AdminRegister/>}/>
        <Route path="/user-login" element={<LoginPage/>}/>
        <Route path="/user-register" element={<Register/>}/>
        <Route path="/forgot" element={<UserForgot/>}/>
        <Route path="/adminforgot" element={<AdminForgot/>}/>
      </Route>


      <Route path="/" element={<AdminLayout/>}>
          <Route path="/AdminHome" element ={<AdminHomePage/>}/>
          <Route path="/user" element ={<ViewUser/>}/>
          <Route path="/post" element={<ViewPost/>}/>
          <Route path="/engagement" element={<UserEngagement/>}/>
      </Route>
      
      <Route path="/" element={<UserLayout/>}>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/leagues" element={<Leagues/>}/>
        <Route path="/FL" element={<FootballLeagues/>}/>

      </Route>
      <Route path="/CL" element={<ChampionsLeague/>}/>
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;

