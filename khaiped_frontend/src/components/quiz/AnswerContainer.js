import React, { useEffect, useState } from 'react'

function AnswerContainer(props) {
  const [isUserClicked, setIsUserClicked] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    setIsUserClicked(props.userClicked)
    setIsButtonClicked(props.buttonClicked)
    setIsCorrect(props.correct)
  }, [props.userClicked]);

  // const colorSelector = isClicked ? (isCorrect ? 'bg-green-500' : 'bg-white') : (isButtonClicked ? 'bg-green-500' : 'bg-red-500');
  const colorSelector = isUserClicked ? (isCorrect ? 'bg-green-500' : (isButtonClicked ? 'bg-red-500' : 'bg-white')) : 'bg-white';

  return (
    <div className={`${colorSelector} w-[550px] h-[100px] rounded-[35px] flex justify-center items-center font-bold text-[40px]`}>
      {props.choice}
    </div>
  )
}

export default AnswerContainer