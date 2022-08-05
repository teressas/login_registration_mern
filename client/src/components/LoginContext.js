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
        console.log("loginContext22",users)
    }, [users]);

    // {props.children} required to render children
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

// function TopLevelComponent(props) {
//     return (
//         <LoginContextProvider>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/users" element={<Dashboard />} />
//                 </Routes>
//             </BrowserRouter>
//         </LoginContextProvider>
//     );
// }

// function LoginComponent(props) {
//     const { setUsers } = useContext(loginContext);
//     const navigate = useNavigate();

//     /**
//      * There's other code here for the rest of your login
//      * but only the submit handler is shown
//      */
//     function handleSubmit() {
//         axios
//             .post(`/login`, { withCredentials: true })
//             .then((res) => {
//                 setUser(res.data);
//                 navigate('/otherpage');
//             })
//             .catch((err) => { });
//     }

//     return <>jsx elements here</>;
// }

// function DashboardComponent(props) {
//     const { isLoggedIn } = useContext(loginContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!isLoggedIn) {
//             navigate('/login');
//         }
//     }, []);

//     return <>jsx elements here</>;
// }

export { loginContext, LoginContextProvider }