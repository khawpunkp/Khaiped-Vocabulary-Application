import React, { useEffect, useState } from 'react'
import AnswerContainer from '../components/quiz/AnswerContainer'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import ResultBox from '../components/game/ResultBox';
import HelpButton from '../components/home/HelpButton';

function QuizPage() {
  const { mode } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const allWords = urlParams.get('allWords');

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(0);
  const [disableButton, setDisableButton] = useState(false)

  const getQuiz = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/quiz/get-quiz/?m=${mode}&a=${allWords}`)
      .then(response => {
        setQuestion(response.data.question)
        setAnswer(response.data.answer)
        setChoices(response.data.choices)
      })
      .catch(error => {
        console.log(error);
      });
  }

  const post = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/quiz/score`, {
      score: score,
    })
  }

  useEffect(() => {
    if (questionIndex <= 10) {
      getQuiz();
      setButtonClicked(false);
      setDisableButton(false);
    }
    else{
      post();
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
      <div className="fixed right-5 top-28 z-40">
        <HelpButton quiz={true} />
      </div>
      {(questionIndex <= 10) ? (
        <div className='flex flex-col space-y-5'>
          <div className='thai text-[60px] w-[1100px] font-bold text-center'>{question}</div>
          <div className="grid grid-cols-2 gap-x-[100px] gap-y-[20px] justify-center">
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
        // <div className="flex flex-col space-y-20">
        //   <div className='text-[80px] font-bold text-center'>Quiz completed!</div>
        //   <div className='text-[40px] font-bold text-center'>Your Score: {score}/10</div>
        // </div>
        <div className="fixed top-[70px] bottom-0 left-0 right-0 flex justify-center items-center">
          <ResultBox result='Quiz Completed!' subtext={`Your Score: ${score}/10`} />
        </div>
      )
      }
    </div>
  )
}
export default QuizPage