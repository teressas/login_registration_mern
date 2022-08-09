import './App.css';
import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";

import Dashboard from './components/Dashboard';
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';
import { loginContext } from './components/LoginContext';

function App() {
  const { users } = useContext(loginContext);

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        {users ?
          <Route exact path='/chat' element={<ChatPage />} />
          :
          <></>
        }
        {users ?
          <Route path='/users' element={<Dashboard />} />
          :
          <></>
        }
      </Routes>
    </div>
  );
}

export default App;
