import React from 'react'
import './MyOrders.css';
import {useState, useEffect } from 'react';

function MyOrders() {
  const [user, setUser] = useState({});

  useEffect(()=>{
    const storageUse = JSON.parse(localStorage.getItem('user') || '{}');
    if(storageUse?.email){
      setUser(storageUse);
    }
    else{
      alert("You are not logged in");
      window.location.href = "/login";
    }
   
  
  },[])
  return (
    <div>
        <h1>My Orders</h1>
    </div>
  )
}

export default MyOrders