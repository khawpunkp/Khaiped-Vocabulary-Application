import React, { useState } from 'react'
import LetterBox from '../components/game/LetterBox'

function GamePage() {
  const rowContainter = "flex flex-row space-x-5"
  const [inputValue, setInputValue] = useState('')
  return (
    <div className='content flex flex-col justify-center space-y-10'>
      <div className={`${rowContainter}`}>
        <LetterBox letter={"A"} />
      </div>
      <div className="text-[40px] font-black">E A I C N I H T U N T A O T</div>
      <div className="text-[40px] font-bold">(Noun) การรับรองความถูกต้อง </div>
      <div className={`${rowContainter} items-center`}>
        <div className="inputBox w-[400px]">
          <input type="text"
            placeholder="Enter your answer"
            className="w-full bg-transparent pt-2 pb-1 outline-none text-2xl placeholder-[#590070] placeholder-opacity-30"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </div>
        <div className="submitButton">
          Submit
        </div>
      </div>
    </div>
  )
}

export default GamePage