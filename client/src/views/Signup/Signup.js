import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("female");

  const signup = async () => {
    if (!name) {
      alert("name is required");
      return
    }
    if (!email) {
      alert("email is required");
      return
    }
    if (!password) {
      alert("password is required");
      return
    }
    if (!mobile) {
      alert("mobile is required");
      return
    }
    if (!address) {
      alert("address is required");
      return
    }
    const responce = await axios.post("/signup", {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      address: address,
      gender:gender
    
    })

    alert(responce?.data?.message);


if(responce?.data?.success){
  window.location.href = "/login";
}


  };

  useEffect(()=>{
    const storageUser = JSON.parse(localStorage.getItem("user"));
    if(storageUser?.email){
      alert("You are already logged in");
    }
  
  },[])

  return (
    <div>
      <Navbar />
      <form className='signup-form'>
        <h1 className='text-center'>signup</h1>

        <div>
          <label htmlfor="name">  Name</label>
          <input type='text'
            className='form-control'
            id="name"
            placeholder='Enter name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }} />
        </div>
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
        <div>
          <label htmlfor="mobile"> Enter Mobile</label>
          <input type='text'
            className='form-control'
            id="mobile"
            placeholder='Enter mobile'
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }} />
        </div>
        <div>
          <label htmlfor="address"> Address</label>
          <input type='text'
            className='form-control'
            id="address"
            placeholder='Enter address'
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }} />
        </div>
        <div>

          <input type='radio'
            id='male'
            name='gender'
            className='gender'
            checked={gender == "male"}
            onClick={() => {
              setGender("male");
            }}
          />
          <label htmlfor="male">Male</label>


          <input type='radio'
            id='female'
            name='gender'
            className='gender'
            checked={gender == "female"}
            onClick={() => {
              setGender("female")
            }}
          />
          <label htmlfor="female" >Female</label>

        </div>

        <div>
          <button type='button'
            className='btn signup-btn'
            onClick={signup}
          >signup</button>

<p className="text-right">
          <Link to="/login" >Already have an Account</Link>
        </p>

        </div>
      </form>
    </div>
  )
}

export default Signup