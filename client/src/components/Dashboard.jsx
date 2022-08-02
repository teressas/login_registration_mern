import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();


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