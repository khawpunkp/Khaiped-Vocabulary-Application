import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/login/SubmitButton';
import HelpButton from '../components/home/HelpButton';

function FlachcardHomePage() {
  const [isInclude, setIsInclude] = useState(false);
  const navigate = useNavigate();


  const handleCheckboxChange = (event) => {
    setIsInclude(event.target.checked);
  };

  const handleModeSelection = () => {
    navigate(`/flashcard-page/?learnedWords=${isInclude}`)
  }

  return (
    <div className='content flex flex-col justify-center space-y-5'>
      <div className="text-[128px] font-bold">
        Flashcard
      </div>
      <div className="flex flex-row space-x-4">
        <button onClick={() => handleModeSelection()}>
          <SubmitButton text='Start' />
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
      <div className="fixed right-5 top-28 z-40">
        <HelpButton flashcard={true} />
      </div>  
    </div>
  )
}

export default FlachcardHomePage