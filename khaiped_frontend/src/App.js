import React from 'react';
import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import HomeButtonContainer from './components/HomeButtonContainer'


function App() {
  return (
    <div className="bg-priamry">  
      <Navbar/>   
      <HomeButtonContainer/>
    </div>
  );
}

export default App;
