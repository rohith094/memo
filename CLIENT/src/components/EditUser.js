import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function NewUser() {
  const navigate = useNavigate();

  const {id} = useParams();

  const [user,setUser] = useState({
    name: "",
    username: "",
    email:""
  })
  const token = localStorage.getItem('token');
  useEffect(()=>{
    if(!token){
      navigate("/");
    }
    loadUser();
  },[token,navigate]);
  
  const loadUser = async ()=>{
    // const response = await axios.get(`http://localhost:8081/user/${id}`);
    const response = await axios.get(`https://memo-i7q4.onrender.com/user/${id}`);
    setUser(response.data);
  } 

  const handleChange = (e)=>{
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const addUser = async (e)=>{
    e.preventDefault();
    // await axios.put(`http://localhost:8081/user/${id}`,user);
    const token = localStorage.getItem('token');
    await axios.put(`https://memo-i7q4.onrender.com

/user/${id}`,user,{
      headers: {
        Authorization: `${token}`, 
      },
    });
    navigate("/");
  } 

  const BacktoHome = ()=>{
    navigate("/home");
  }

  return (
      <form id="form" className='mx-4 mt-5' onSubmit={addUser}>
      <h3 className='text-center fw-bold text-secondary'>EDIT USER</h3>
        <div className="mb-3">
          <label  className="form-label fw-bold"
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
          <label className="form-label fw-bold"
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
          <label className="form-label fw-bold"
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
          <button type="submit" className="btn btn-success btn-xm mb-3 fw-bold">EDIT</button>
          <button onClick={BacktoHome} className="btn btn-outline-danger btn-xm mb-3 fw-bold">cancel</button>
        </div>
      </form>
  )
}

export default NewUser;