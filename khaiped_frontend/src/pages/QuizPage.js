import React, { useEffect, useState } from 'react'
import AnswerContainer from '../components/quiz/AnswerContainer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

function QuizPage() {
  const { mode } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const allWords = urlParams.get('allWords');
  const navigate = useNavigate();

  // console.log(mode);
  // console.log(allWord);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(1);
  // const [isCorrect, setIsCorrect] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  // const [userClicked, setUserClicked] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [disableButton, setDisableButton] = useState(false)

  const getQuiz = () => {
    axios
      .get(`http://127.0.0.1:8000/quiz/getQuiz/?mode=${mode}&allWords=${allWords}`)
      .then(response => {
        setQuestion(response.data.question)
        setAnswer(response.data.answer)
        setChoices(response.data.choices)
      })
      .catch(error => {
        console.log(error);
      });
  }

  const endQuiz = () => {
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  useEffect(() => {
    if (questionIndex <= 10) {
      getQuiz();
      setButtonClicked(false);
      setDisableButton(false);
    }
    else{
      endQuiz();
    }
  }, [questionIndex])

  const handleAnswerSelection = (choiceIndex) => {
    const selectedChoice = choices[choiceIndex]
    const isCorrect = (selectedChoice === answer)

    setDisableButton(true)

    if (isCorrect) {
      setScore(score + 1)
    }    
    setButtonClicked(true);
    setClickedIndex(choiceIndex);

    setTimeout(() => {
      setQuestionIndex(questionIndex + 1);
    }, 1500);
    // setIsCorrect(isCorrect);
  }

  return (
    <div className="content flex justify-center">
      {(questionIndex <= 10) ? (
        <div className='flex flex-col space-y-5'>
          <div className='thai text-[60px] w-[1190px] font-bold text-center'>{question}</div>
          <div className="grid grid-cols-2 gap-x-[90px] gap-y-[20px]">
            <button onClick={() => handleAnswerSelection(0)} disabled={disableButton}>
              <AnswerContainer               
              choice={choices[0]} 
              userClicked={buttonClicked} 
              buttonClicked={buttonClicked && clickedIndex === 0}
              correct={choices[0] === answer} />
            </button>
            <button onClick={() => handleAnswerSelection(1)} disabled={disableButton}>
              <AnswerContainer 
              choice={choices[1]} 
              userClicked={buttonClicked} 
              buttonClicked={buttonClicked && clickedIndex === 1} 
              correct={choices[1] === answer} />
            </button>
            <button onClick={() => handleAnswerSelection(2)} disabled={disableButton}>
              <AnswerContainer 
              choice={choices[2]} 
              userClicked={buttonClicked} 
              buttonClicked={buttonClicked && clickedIndex === 2}
              correct={choices[2] === answer} />
            </button>
            <button onClick={() => handleAnswerSelection(3)} disabled={disableButton}>
              <AnswerContainer 
              choice={choices[3]} 
              userClicked={buttonClicked} 
              buttonClicked={buttonClicked && clickedIndex === 3} 
              correct={choices[3] === answer} />
            </button>
          </div>
          <div className="text-[40px] font-bold text-center">{questionIndex}/10</div>
        </div>
      ) : (
        <div className="flex flex-col space-y-20">
          <div className='text-[80px] font-bold text-center'>Quiz completed!</div>
          <div className='text-[40px] font-bold text-center'>Your Score: {score}/10</div>
        </div>
      )
      }
    </div>
  )
}
export default QuizPage