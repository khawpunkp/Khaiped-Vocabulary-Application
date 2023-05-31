import React, { useEffect, useState } from 'react'
import Flashcard from '../components/flashcard/Flashcard'
import happy from "../assets/svg/flashcard/happy.svg"
import mad from "../assets/svg/flashcard/mad.svg"
import axios from 'axios'
import ResultBox from '../components/game/ResultBox'


function FlashcardPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const learned = urlParams.get('learnedWords');
  const [wordsID, setWordsID] = useState([]);
  const [flashcardsID, setFlashcardsID] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const getWordID = () => {
    axios
      .get(`http://127.0.0.1:8000/flash/getWords/?l=${learned}`)
      .then(response => {
        setWordsID(response.data.word_ids);
        setFlashcardsID(response.data.word_ids);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }

  const storeWordLearned = () => {
    axios.post(`http://127.0.0.1:8000/user/store-word-learned`, {
      withCredentials: true,
      word_ids: wordsID
    })
    .then(response => {
      setIsDone(true);
    })
    .catch(error => {
      console.log(error);
    });
  }

  const handleMemorizeButton = (isMem) => {
    if (isMem && flashcardsID.length > 1) {
      setFlashcardsID(prevState => prevState.slice(1));
    } 
    else if (!isMem && flashcardsID.length > 1) 
    {
      setFlashcardsID(prevState => {
        const [firstID, ...restIDs] = prevState;
        return [...restIDs, firstID];
      });
    }
    else{
      storeWordLearned();
    }
    console.log(flashcardsID);
  };

  useEffect(() => {
    getWordID();
  }, [])

  if (isLoading) {
    return (
      <div className='content flex justify-center'>
        <h1 className='font-black text-[80px] text-center'>Loading...</h1>
      </div> // Show a loading state while fetching the word
    )
  }

  if (!flashcardsID) {
    return (
      <div className='content flex justify-center'>
        <h1 className='font-black text-[80px] text-center'>No word available</h1>
      </div> // Handle the case when wordData is empty
    )
  }

  if (isDone) {
    
  }

  return (
    <div className='content flex flex-col justify-center space-y-5'>
      {!isDone && <Flashcard id={flashcardsID[0]} />}
      {!isDone && <div className="flex flex-row space-x-64">
        <button className="h-[70px] w-[70px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${mad})`
          }}
          onClick={() => handleMemorizeButton(false)}
        >
        </button>
        <button className="h-[70px] w-[70px] bg-cover bg-center"
          style={{
            backgroundImage: `url(${happy})`
          }}
          onClick={() => handleMemorizeButton(true)}
        >
        </button>
      </div>}   
      {isDone && <div className="fixed top-[70px] bottom-0 left-0 right-0 flex justify-center items-center">
                <ResultBox result = 'Complete!' subtext = 'You memorize all words'/>
      </div>} 
    </div>
  )
}

export default FlashcardPage


