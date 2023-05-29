import React from 'react'

function LetterBox(props) {
  return (
    <div className='bg-white w-[75px] h-[75px] rounded-2xl flex items-center justify-center'>
        <p className="text-[40px] font-bold">
            {props.letter}
        </p>        
    </div>
  )
}

export default LetterBox