import axios from 'axios';
import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function NewUser() {
  const navigate = useNavigate();

  const [user,setUser] = useState({
    name: "",
    username: "",
    email:""
  })

  const isloggedIn = localStorage.getItem("isLogin");
  useEffect(()=>{
    if(!isloggedIn){
      navigate("/home");
    }
  },[isloggedIn,navigate]);

  const handleChange = (e)=>{
    e.preventDefault();
    const {name,value} = e.target;

    setUser(previousvalue => (
      {
        ...previousvalue,
        [name]:value
      }
    ))
  }

  const addUser = async (e)=>{
    e.preventDefault();
    // await axios.post("http://localhost:8081/user",user);
    const token = localStorage.getItem('token');
    try{
      await axios.post("https://memo-i7q4.onrender.com

/user",user,{
        headers: {
          Authorization: `${token}`, 
        },
      });
      navigate("/home");
    }
    catch(err){
      console.log("error posting user", err);
    }
  }

  const BacktoHome = ()=>{
    navigate("/home");
  } 
  return (
      <form id="form" className='mx-4 mt-5' onSubmit={addUser} autoComplete="off" >
        <div className="mb-3">
          <h3 className='text-center fw-bold text-warning'>ADD NEW USER</h3>
          <label  className="form-label fw-bold text-warning"
            >Full Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            placeholder="example : Rohith Kumar Menda"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-warning"
            >Username</label>
          <input
            name="username"
            type="text"
            className="form-control"
            id="name"
            placeholder="enter your username"
            value={user.username}
            onChange={handleChange} 
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold text-warning"
            >Mail</label>
          <input
            name="email"
            type="mail"
            className="form-control"
            id="email"
            placeholder="enter your email.."
            value={user.email}
            onChange={handleChange} 
            required
          />
        </div>
        <div className="d-grid gap-2 col-3 mx-auto">
          <button type="submit" className="btn btn-warning btn-xm mb-3 fw-bold">ADD</button>
          <button onClick={BacktoHome} className="btn btn-outline-warning btn-xm mb-3 fw-bold">CANCEL</button>
        </div>
      </form>
  )
}

export default NewUser;