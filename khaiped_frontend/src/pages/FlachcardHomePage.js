import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function FlachcardHomePage() {
    const [isInclude, setIsInclude] = useState(false);
    const navigate = useNavigate();
  
  
    const handleCheckboxChange = (event) => {
      setIsInclude(event.target.checked);
    };
  
    const handleModeSelection = (mode) => {
      navigate(`/flashcard-page/${mode}/?learnedWords=${isInclude}`)
    }
  
    return (
      <div className='content flex flex-col justify-center space-y-5'>
        <div className="text-[128px] font-bold">
          Flashcard
        </div>
        <div className="flex flex-row space-x-4">
          <button className='submitButton' onClick={() => handleModeSelection('select')}>
            Select Words
          </button>
          <button className='submitButton' onClick={() => handleModeSelection('random')}>
            Random
          </button>
        </div>
        <div className="flex flex-row space-x-3 items-center">
          <input
            type="checkbox"
            checked={isInclude}
            onChange={handleCheckboxChange}
            style={{ transform: 'scale(1.5)' }}
            className='mb-1' // Increase the size of the checkbox
          />
          <p className="font-bold text-[20px]">Learned Words</p> 
        </div>
      </div>
    )
}

export default FlachcardHomePage