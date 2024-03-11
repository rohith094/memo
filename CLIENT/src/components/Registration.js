import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function Registration() {

  const [user, setUser] = useState({
    username : "",
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  const handleInputChange = (e)=>{
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }

  const addNewUser = async (e)=>{
    e.preventDefault();
    
    try{
      const response = await axios.post("http://localhost:3001/register", user);
      console.log(response.data);
      if(response.data.status){
        toast.error(response.data.message);
      }
      else{
      toast.success("Registration successful...");
      navigate("/login");
      }
    }
    catch(err){
      console.log("error in creating new user", err);
    }
  }

  return (
    <div className="Registration">
      <form onSubmit={addNewUser} autoComplete="off">
        <div className="submit">
          <h3 className="fw-bold text-warning">Registration</h3>
        </div>
        <div className="mb-3">
          <label htmlFor="user" className="form-label fw-bold text-warning">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="form-control"
            id="user"
            aria-describedby="emailHelp"
            value={user.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fw-bold text-warning">
            Email address
          </label>
          <input
          name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={user.email}
            onChange={handleInputChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label fw-bold text-warning">
            Password
          </label>
          <input
          name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="submit">
          <button type="submit" className="btn btn-warning fw-bold text-light">
            Register
          </button>
        </div>
        <div className='register mt-3'>
        <p>alreay have an account ? <Link to="/" className='text-warning'>Login here</Link></p>   
        </div>
      </form>
    </div>
  );
}

export default Registration;
