import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Routes, Route, useNavigate } from "react-router-dom";

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/" element={<Login />} />
    </Routes>
    </div>
  );
}

export default App;
