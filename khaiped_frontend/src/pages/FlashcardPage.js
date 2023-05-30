import React from 'react'
import Flashcard from '../components/flashcard/Flashcard'
import happy from "../assets/svg/flashcard/happy.svg"
import mad from "../assets/svg/flashcard/mad.svg"


function FlashcardPage() {
  return (
    <div className='content flex flex-col justify-center space-y-5'>
      <Flashcard />
      <div className="flex flex-row space-x-64">
      <button  className="sound h-[70px] w-[70px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${mad})`
      }}>
      </button>

      <button  className="sound h-[70px] w-[70px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${happy})`
      }}>
        
      </button>      
      </div>
      
    </div>
  )
}

export default FlashcardPage


