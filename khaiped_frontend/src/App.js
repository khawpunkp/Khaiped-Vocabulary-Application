import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';

import Home from './pages/Home.js'
import Login from './pages/Login';
import Register from './pages/Register';
import Statistic from './pages/Statistic';
import Dictionary from './pages/Dictionary';

import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

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
          <Route path='/register' element={<Register />} />
          <Route path='/statistic' element={<Statistic />} />
          <Route path='/dictionary' element={<Dictionary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
