import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function GameHomePage() {
    const [isInclude, setIsInclude] = useState(false);
    const navigate = useNavigate();
  
  
    const handleCheckboxChange = (event) => {
      setIsInclude(event.target.checked);
    };
  
    const handleStart = () => {
      navigate(`/game-page/allWords=${isInclude}`)
    }
  
    return (
      <div className='content flex flex-col justify-center space-y-5'>
        <div className="text-[128px] font-bold">
          Word Scramble
        </div>
        
          <button className='submitButton' onClick={() => handleStart()}>
            Start
          </button>          
        
        <div className="flex flex-row space-x-3 items-center">
          <input
            type="checkbox"
            checked={isInclude}
            onChange={handleCheckboxChange}
            style={{ transform: 'scale(1.5)' }}
            className='mb-1' // Increase the size of the checkbox
          />
          <p className="font-bold text-[20px]">All Words</p> 
        </div>
      </div>
    )
}

export default GameHomePage