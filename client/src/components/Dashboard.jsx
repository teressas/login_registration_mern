import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

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