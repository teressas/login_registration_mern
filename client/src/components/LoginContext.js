import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './authentication/Login';
import Dashboard from './Dashboard';

const loginContext = React.createContext(
    {
        users: undefined,
        isLoggedIn: false,
        setUsers: undefined, 
    }// values required to pass to descendents
);

function LoginContextProvider(props) {
    const [users, setUsers] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // console.log("loginContext18",users)

    useEffect(() => {
        setIsLoggedIn(users ? true : false);
        // console.log("loginContext22",users)
    }, [users]);

    // {props.children} required to render children in App.js routes
    return (
        <loginContext.Provider
            value={{
                users,
                isLoggedIn,
                setUsers,
            }}
        >
            {props.children}
        </loginContext.Provider>
    );
}

export { loginContext, LoginContextProvider }