import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const isLogin = localStorage.getItem("isLogin");
  const navigate = useNavigate();
   
  const handleLogin = ()=>{
    localStorage.removeItem("isLogin");
    localStorage.removeItem("token");
    toast.success("logout succesfull...");
    navigate("/login");
  }
  return (
    <div className='Navbar-container'>
      <nav className="navbar navbar-warning bg-warning p-2 navbar-expand-lg">
        <a className="navbar-brand text-light" href='/home'>Data Book</a>
        <button className='navbar-toggler' data-bs-toggle="collapse" data-bs-target="#menu">
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className=" navbar-collapse collapse justify-content-end" id='menu'>
          {isLogin && (
            <>
            <Link to="/new" className='btn btn-outline-light m-2'>AddUser</Link>
            <button onClick={handleLogin} className='btn btn-outline-light m-2'>Logout</button>
            </>
          ) }
        </div>
      </nav>
    </div>
  )
}

export default Navbar;