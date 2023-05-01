import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';


import Home from './pages/Home.js'
import Random from './pages/Random'
import Login from './pages/Login';

import HomeButtonContainer from './components/home/HomeButtonContainer'
import MainWordContainer from './components/word/MainWordContainer';



function App() {
  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full">
        <Navbar />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>

      {/* <div className="content flex">
            <HomeButtonContainer />
        </div> */}
    </div>
  );
}

export default App;
