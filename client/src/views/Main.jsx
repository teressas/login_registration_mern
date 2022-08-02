import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Register from '../components/Register';
import Login from '../components/Login';
// import Dashboard from './components/Dashboard';

const Main = () => {
    const [message, setMessage] = useState("Loading...")
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false);

    // useEffect(() => {
    //     axios.get('http://localhost:8000/users')
    //         .then(res => {
    //             setUsers(res.data.users)
    //             console.log(res.data.users);
    //             setLoaded(true);
    //             // console.log(res.data);
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/")
            .then(res => setMessage(res.data.message))
    }, []);

    return (
        <div>
            <Login users={users} />
            <hr />
            <Register users={users} />
        </div>
    )
}

export default Main