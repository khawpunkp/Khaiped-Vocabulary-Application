import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';

import { Home, Login, Register, Statistic, Dictionary, SearchResult, QuizHomePage, QuizPage } from './pages';

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
          <Route path="/search/:searchQuery" element={<SearchResult />} />
          <Route path="/quiz" element={<QuizHomePage />} />
          <Route path="/quiz-page" element={<QuizPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
