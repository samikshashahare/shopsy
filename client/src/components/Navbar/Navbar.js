import React, { useEffect, useState } from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom'

function Navbar() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const storageUse = JSON.parse(localStorage.getItem("user") || '{}');
        setUser(storageUse);
    }, [])
    return (
        <div className='navbar'>
            <Link to="/" className='navbar-brand'>
                Shopsy🛒
            </Link>
            <div className='navbar-link-container'>
                <Link to="/login" className='navbar-link'>
                    Login
                </Link><Link to="/signup" className='navbar-link'>
                    Signup
                </Link>
                <Link to="/myorders" className='navbar-link'>
                    My Orders
                </Link>
            </div>
            <div className='navbar-user-container'>
                hello, {user.name || "user"}
                {/* 
                <span className='navbar-link' onClick={()=>{
                    localStorage.removeItem("user");
                    window.location.href = "./login"
                }}>Logout</span> */}

                {
                    user?.name ?
                        (
                            <span className='navbar-link' onClick={() => {
                                localStorage.removeItem("user");
                                window.location.href = "./login"
                            }}>
                                Logout
                            </span>
                        ) : null
                }
            </div>
        </div>
    )
}

export default Navbar