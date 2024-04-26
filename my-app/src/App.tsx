import React from 'react';
import './App.css';
import { Link, Route, Routes } from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
export default App;