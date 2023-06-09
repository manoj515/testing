import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
