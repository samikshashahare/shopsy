import React from 'react'
import './MyOrders.css';
import Navbar from './../../components/Navbar/Navbar'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const STATUS_BADGE_COLOR_MAP = {
  "pending": "badge-danger",
  "shipped": "badge-warning",
  "delivered": "badge-success"
}

function MyOrders() {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);


  const loadOrders = async () => {

    const userId = user._id;
    if (!userId) {
      return;
    }
    const response = await axios.get(`/orders/user/${userId}`);
    setOrders(response?.data?.data);
  }


  useEffect(() => {
    loadOrders();
  }, [user]);

  useEffect(() => {
    const storageUse = JSON.parse(localStorage.getItem('user') || '{}');
    if (storageUse?.email) {
      setUser(storageUse);
      loadOrders(storageUse?._id)
    }
    else {
      alert("You are not logged in");
      window.location.href = '/login';
    }
  }, [])
  return (
    <div>
      <Navbar />
      <h1 className='text-center'>My Orders</h1>
      <div className='orders-container'>
        {
          orders?.map((order, index) => {
            const { product, quantity, status, deliveryCharges } = order;
            return (
              <div className='order_card'>

                <Link to={`/buy/${product._id}`}>{product.name}</Link>

                <h2>{product.name}</h2>
                <h3>{product.price} * {quantity} = {product.price * quantity} </h3>
                <p>{deliveryCharges}</p>
                <span className={`orders-status ${STATUS_BADGE_COLOR_MAP[status]}`}>
                  {status}
                </span>
              </div>
            )
          })

        }</div>
    </div >
  )
}

export default MyOrders