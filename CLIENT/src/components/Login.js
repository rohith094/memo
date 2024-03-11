
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isloggedIn = localStorage.getItem("isLogin");

  useEffect(()=>{
    if(isloggedIn){
      navigate("/home");
    }
  },[isloggedIn,navigate]);


  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior


    try {
      const response = await axios.post("http://localhost:3001/login", { email, password }); 
      const { token, login } = response.data;
      // console.log(login);
      localStorage.setItem("token", token);
      localStorage.setItem("isLogin", login);
      toast.success("login successfull..");
      navigate("/home");
    } catch (error) {
      toast.error("wrong credentials..check agian....")
      console.error("Error:", error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="Login">
      <form onSubmit={handleLogin} autoComplete="off">
        <div className="login">
          <h3 className="fw-bold text-warning">Login</h3>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fw-bold text-warning">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <div id="emailHelp" className="form-text">
            Enter the registered email for login...
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label fw-bold text-warning">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="login">
          <button type="submit" className="btn btn-warning fw-bold text-light">
            Login
          </button>
        </div>
        <div className='register mt-3'>
        <p>do not have an account <Link to="/register" className='text-warning'>Register here</Link></p>   
        </div>
      </form>
    </div>
  );
}

export default Login;
