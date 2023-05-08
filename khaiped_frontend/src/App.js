import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';

import Home from './pages/Home.js'
import Login from './pages/Login';
import Statistic from './pages/Statistic';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <div className="fixed top-0 left-0 w-full">
          <Navbar />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/statistic' element={<Statistic />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
