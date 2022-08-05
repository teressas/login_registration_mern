import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { loginContext, LoginContextProvider } from './LoginContext';


const Dashboard = () => {
    const navigate = useNavigate();

    const { users, isLoggedIn } = useContext(loginContext);

    useEffect(() => {
        console.log("Dashboard", isLoggedIn, users)
        if (!isLoggedIn) {
            // navigate('/');
        }
    }, []);

    const logOut = () => {
        navigate("/");
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logOut} className="btn btn-lg btn btn-info">Logout</button>
        </div>
    )
}

export default Dashboard