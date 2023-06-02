import React, { useEffect, useState } from 'react'
import LetterBox from '../components/game/LetterBox'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ResultBox from '../components/game/ResultBox'
import SubmitButton from '../components/login/SubmitButton'

function GamePage() {
  const rowContainer = "flex flex-row space-x-5"
  const { mode } = useParams();
  const [inputValue, setInputValue] = useState('')
  const [wordData, setWordData] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [hint, setHint] = useState('');
  const [scrambledWordIndex, setScrambledWordIndex] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempt, setAttempt] = useState(0);
  // const [firstAtempt, setFirstAttempt] = useState(false);

  const getWord = () => {
    axios
      .get(`http://127.0.0.1:8000/game/game`)
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

  const post = (firstAtempt) => {
    axios.post(`http://127.0.0.1:8000/game/game`, {
      firstAttempt: firstAtempt,
    })
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
    const value = event.target.value
    if (value.length <= correctAnswer.length) {
      setInputValue(value);
    }
  };

  const handleSubmitButton = () => {
    setIsSubmit(true)
    const isInputCorrect = correctAnswer.toLowerCase() === inputValue.toLowerCase();
    setIsCorrect(isInputCorrect);
    if (isInputCorrect && attempt < 1) {
      post(true);
    }
    else if (isInputCorrect) {
      post(false);
    }
    else {
      setAttempt(attempt + 1);
      setTimeout(() => {
        setInputValue('');
        setIsSubmit(false);
      }, 1500);
    }
    console.log(attempt);
  }

  useEffect(() => {
    getWord();
    setAttempt(0);
    // setFirstAttempt(false);
  }, [])

  return (
    <div className=''>
      {wordData ? (
        <div className='content flex flex-col justify-center space-y-10'>
          <div className={`${rowContainer} justify-center `}>
            {correctAnswer.split('').map((letter, i) => {
              const answerSplit = correctAnswer.split('')
              const isLetterCorrect = (answerSplit[i].toUpperCase() === inputValue[i]?.toUpperCase())
              return (<LetterBox
                key={`${letter}_${i}`}
                letter={inputValue[i]?.toUpperCase()}
                submit={isSubmit}
                correct={isLetterCorrect}
              />)
            })}
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
          </div>
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
            <button onClick={() => handleSubmitButton()}>
              <SubmitButton text='Submit' />
            </button>
          </div>
        </div>
      ) : (
        <div className='content flex justify-center'>
          <h1 className='font-black text-[80px] text-center'>Loading...</h1>
        </div>
      )}
      {isCorrect && <div className="fixed top-[70px] bottom-0 left-0 right-0 flex justify-center items-center">
        <ResultBox result='Correct!' />
      </div>}
    </div>
  )
}


export default GamePage