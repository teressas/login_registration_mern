import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginContext } from './LoginContext';

const Dashboard = () => {

    /* check user login */
    const navigate = useNavigate();

    const { users, isLoggedIn } = useContext(loginContext); 

    useEffect(() => {
        // console.log("Dashboard", isLoggedIn, users)
        if (isLoggedIn) {
            navigate('/');
        }
    }, []);

    /* enables logout */
    const logOut = () => {
        navigate("/");
    }
    

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logOut} className="btn btn-lg btn btn-info">Logout</button>
            {/* <br />
            <input placeholder="Message..." />
            <button onClick={sendMessage}>Send Message</button> */}
        </div>
    )
}

export default Dashboard