import Home from './components/Home';
import React from "react";
import {Routes, Route} from 'react-router-dom';
// import Navbar from './components/Navbar';
import NewUser from './components/NewUser';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';
import Registration from './components/Registration';
import Login from './components/Login';
function App() {
  // const isLogin = localStorage.getItem("isLogin");
  return (
    <>
    {/* <Navbar />
    {
      isLogin && <Navbar />
    } */}
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/new' element={<NewUser />}></Route>
      <Route path='/edit/:id' element={<EditUser />}></Route>
      <Route path='/view/:id' element={<ViewUser />}></Route>
      <Route path='/register' element={<Registration />}></Route>
      <Route path='/login' element={<Login />}></Route>
    </Routes>
    </>
  );
}

export default App;
