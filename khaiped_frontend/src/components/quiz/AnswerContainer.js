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

  const colorSelector = isUserClicked ? (isCorrect ? 'bg-green-500' : (isButtonClicked ? 'bg-red-500' : 'bg-white')) : 'bg-white';

  const handleButtonHover = (event) => {
    event.currentTarget.style.transform = "scale(1.05)";
  };
  const handleButtonLeave = (event) => {
    event.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div className={`${colorSelector} w-[500px] h-[100px] rounded-[35px] flex justify-center items-center font-bold text-[40px]`}
      onMouseEnter={handleButtonHover}
      onMouseLeave={handleButtonLeave}>
      {props.choice}
    </div>
  )
}

export default AnswerContainer