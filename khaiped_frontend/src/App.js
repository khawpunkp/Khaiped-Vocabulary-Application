import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';

import { Home, Login, Register, Statistic, Dictionary, SearchResult, QuizHomePage, QuizPage, GameHomePage, GamePage, FlashcardHomePage, FlashcardPage, WordLearnedPage, Leaderboard } from './pages';

import axios from 'axios'
import QuestButton from './components/home/QuestButton';
import TokenRefresh from './components/TokenRefresh';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="">
      <TokenRefresh />
      <BrowserRouter>
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        {/* <div className="fixed left-5 top-28 z-40">
          <QuestButton />
        </div> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/statistic' element={<Statistic />} />
          <Route path='/dictionary' element={<Dictionary />} />
          <Route path="/search/:searchQuery" element={<SearchResult />} />
          <Route path="/quiz" element={<QuizHomePage />} />
          <Route path="/quiz-page/:mode/:?" element={<QuizPage />} />
          <Route path="/game" element={<GameHomePage />} />
          <Route path="/game-page/:mode" element={<GamePage />} />
          <Route path="/flashcard" element={<FlashcardHomePage />} />
          <Route path="/flashcard-page/:?" element={<FlashcardPage />} />
          <Route path="/wordLearned" element={<WordLearnedPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
