import './App.css';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from './components/Dashboard';
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';
// import { loginContext, LoginContextProvider } from './components/LoginContext';

function App() {
  // const { users } = useContext(loginContext);
  
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/chat' element={<ChatPage />} />

        {/* <Route exact path='/login' element={<Login />} /> */}
        {/* <Route exact path='/register' element={<SignUp />} /> */}
        <Route path='/users' element={<Dashboard />} />
    </Routes>
    </div>
  );
}

export default App;
