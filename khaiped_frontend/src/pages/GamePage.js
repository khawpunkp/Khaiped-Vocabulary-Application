import React, { useEffect, useState } from 'react'
import LetterBox from '../components/game/LetterBox'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function GamePage() {
  const rowContainer = "flex flex-row space-x-5"
  const { mode } = useParams();
  const [inputValue, setInputValue] = useState('')
  const [wordData, setWordData] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [hint, setHint] = useState('');
  const [scrambledWordIndex, setScrambledWordIndex] = useState('');

  // const [isCorrected, setIsCorrected] = useState(false);


  const getWord = () => {
    axios
      .get(`http://127.0.0.1:8000/game/getWord`)
      .then(response => {
        const word = response.data.word;
        setWordData(word);
        setCorrectAnswer(word.word);
        setScrambledWord(word.scrambled_word.split(''))
        setScrambledWordIndex(word.index.split('').map((element) => parseInt(element, 10)))
        if (mode === 'easy') {
          setHint(word.tran_th);
        } else {
          setHint(word.tran_eng);
        }
        console.log(word);

      })
      .catch(error => {
        console.log(error);
      });
  }

  function countLetterOccurrences(letter) {
    const input = inputValue.toUpperCase();
    const searchLetter = letter.toUpperCase();
    let count = 0;  
    for (let i = 0; i < input.length; i++) {
      if (input[i] === searchLetter) {
        count++;
      }
    }  
    return count;
  }

  const handleInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    setInputValue(value);    
  };

  const handleSubmitButton = () => {
    if (correctAnswer.toLowerCase() === inputValue.toLowerCase())
      console.log('correct');
    else
      console.log('wrong');
  }

  useEffect(() => {
    getWord();
  }, [])

  return (
    <div className=''>
      {wordData ? (
        <div className='content flex flex-col justify-center space-y-10'>
          <div className={`${rowContainer} justify-center `}>
            {correctAnswer.split('').map((letter, i) => (
              <LetterBox key={`${letter}_${i}`} letter={inputValue[i]?.toUpperCase()} />
            ))}
          </div>
          <div className={`${rowContainer} justify-center `}>            
            {scrambledWord.map((letter, i) => {
              const isMatch = countLetterOccurrences(letter) > scrambledWordIndex[i];

              return (
                <p
                  key={`${letter}_${i}`}
                  className={`text-[40px] font-black text-center ${isMatch ? ' text-gray-300' : ''
                    }`}
                >
                  {letter.toUpperCase()}
                </p>
              );
            })}
            {/* {scrambledWord.map((letter, i) => (
            <p key={`${letter}_${i}`} className={`text-[40px] font-black text-center ${i === firstMatchIndex ? 'text-red-500' : ''}`}> {scrambledWord[i]?.toUpperCase()} </p>
            ))} */}
          </div>
          {/* <div className="text-[40px] font-black text-center">{scrambledWord}</div> */}
          <div className="text-[30px] font-bold  text-center w-[900px]">({wordData.part_of_speech}) {hint}</div>
          <div className={`${rowContainer} items-center justify-center `}>
            <div className="inputBox w-[400px]">
              <input type="text"
                placeholder="Enter your answer"
                className="w-full bg-transparent pt-2 pb-1 outline-none text-2xl placeholder-[#590070] placeholder-opacity-30"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            <button className="submitButton" onClick={() => handleSubmitButton()}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className='content flex justify-center'>
          <h1 className='font-black text-[80px] text-center'>Loading...</h1>
        </div>
      )}
    </div>
  )
}


export default GamePage