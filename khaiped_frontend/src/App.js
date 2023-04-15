import React from 'react';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import HomeButtonContainer from './components/home/HomeButtonContainer'
import MainWordContainer from './components/word/MainWordContainer';


function App() {
  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full">
        <Navbar />
      </div>
      {/* <div className="flex justify-center items-center h-screen pt-[70px]">
        <HomeButtonContainer />        
      </div> */}
      <div className="flex justify-center items-center h-screen pt-[70px]">
        <MainWordContainer />        
      </div>
    </div>
  );
}

export default App;
