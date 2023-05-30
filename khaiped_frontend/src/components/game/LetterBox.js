import React, { useEffect, useState } from 'react'

function LetterBox(props) {
  const [isSubmit, setIsSubmit] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  useEffect(() => {
    setIsSubmit(props.submit)
    setIsCorrect(props.correct)
  }, [props.submit]);

  const colorSelector = isSubmit ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-white';
  return ( 
    <div className={`${colorSelector} w-[75px] h-[75px] rounded-2xl flex items-center justify-center`}>
        <p className="text-[40px] font-bold">
            {props.letter}
        </p>        
    </div>
  )
}

export default LetterBox