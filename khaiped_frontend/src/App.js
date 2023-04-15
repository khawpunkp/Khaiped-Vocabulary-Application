import React from 'react';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import HomeButtonContainer from './components/HomeButtonContainer'


function App() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <HomeButtonContainer />
      </div>
    </div>
  );
}

export default App;
