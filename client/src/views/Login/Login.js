import React from 'react';
import { useState, useEffect } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const responce = await axios.post( "/login", {
      email: email,
      password: password
    });
    alert(responce?.data?.message);

    if(responce?.data?.success){
      localStorage.setItem("user", JSON.stringify(responce.data?.data));
      window.location.href = "/";
        }

  }
  useEffect(()=>{
    const storageUser = JSON.parse(localStorage.getItem("user"));
    if(storageUser?.email){
      alert("You are already logged in");
    }
  
  },[])
return (
  <div>
    <Navbar />
    <from className='login-form'>
      <h1 className='text-center'>Login</h1>

      <div>
        <label htmlfor="email"> Email</label>
        <input type='text'
          className='form-control'
          id="email"
          placeholder='Enter email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }} />
      </div>
      <div>
        <label htmlfor="password">  Password</label>
        <input type='password'
          className='form-control'
          id="password"
          placeholder='Enter password'
          hidden='true'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }} />
      </div>

      <buttton type='button'
        className='btn login-btn'
        onClick={login} >Login</buttton>

      <p className="text-right">
        <Link to="/signup" >Create New Account</Link>
      </p>

    </from>

  </div>
)

}

export default Login