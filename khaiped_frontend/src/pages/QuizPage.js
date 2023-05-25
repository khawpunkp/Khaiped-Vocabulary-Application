import React from 'react'
import AnswerContainer from '../components/quiz/AnswerContainer'

function QuizPage() {
  return (
    <div className="content flex flex-col justify-center space-y-20">
      <div className='text-[80px] font-bold'>QuizPage</div>
      <div className="grid grid-cols-2 gap-x-[90px] gap-y-[20px]">
        <AnswerContainer />
        <AnswerContainer />
        <AnswerContainer />
        <AnswerContainer />
      </div>
      <div className="text-[40px] font-bold">1/10</div>
    </div>
  )
}

export default QuizPage