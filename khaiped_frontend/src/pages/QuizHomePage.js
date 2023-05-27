import React from 'react'

function QuizHomePage() {
  return (
    <div className='content flex flex-col justify-center'>
      <div className="text-[128px] font-bold">
        Quiz
      </div>
      <div className="">
        <button className='submitButton'>{'Easy'}</button>
        <button className='submitButton'>{'Hard'}</button>
      </div>

    </div>
  )
}

export default QuizHomePage