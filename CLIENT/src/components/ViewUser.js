import React, { useState , useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ViewUser() {

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: ""
  })

  const {id} = useParams(); 
  
  const navigate =useNavigate();
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if(!token){
      navigate("/");
    }
    loadUser();
  },[token,navigate]);

  const loadUser = async () =>{
    // const response = await axios.get(`http://localhost:8081/user/${id}`)
    const response = await axios.get(`http://localhost:3001/user/${id}`)
    setUser(response.data);
  }

  const backtohome = () =>{
    navigate("/home");
  }
  return (
      <div className="card mx-auto mt-5" style={{width : "30rem"}} key={user.id}>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>Name : </b>{user.name}</li>
          <li className="list-group-item"><b>UserName : </b> {user.username}</li>
          <li className="list-group-item"><b>Email : </b> {user.email} </li>
          <li className='list-group-item mx-auto'><button className='btn btn-outline-dark' onClick={backtohome}>Back to Home</button></li>
        </ul>
      </div>
  )
}

export default ViewUser;