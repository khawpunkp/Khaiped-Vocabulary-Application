import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import HomeHelpContainer from './HomeHelpContainer';
import FlashcardHelpContainer from '../flashcard/FlashcardHelpContainer';
import GameHelpContainer from '../game/GameHelpContainer';
import QuizHelpContainer from '../quiz/QuizHelpContainer';

function HelpButton(props) {
    const [isShown, setIsShown] = useState(false);
    const refQuestButton = useRef();

    const handleButtonHover = (event) => {
        event.currentTarget.style.transform = "scale(1.05)";
    };
    const handleButtonLeave = (event) => {
        event.currentTarget.style.transform = "scale(1)";
    };

    useEffect(() => {
        let handleClickOutside = (event) => {
            if (!refQuestButton.current.contains(event.target)) {
                setIsShown(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    })

    return (
        <div className="relative">
            <button
                className="rounded-full bg-[#D885FF] w-[70px] h-[70px] border-[3px] border-black flex items-center justify-center"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                onClick={() => setIsShown(!isShown)}
                ref={refQuestButton}
            >
                <FontAwesomeIcon icon={faQuestion} style={{ fontSize: '40px' }} />
            </button>
            {isShown &&
                (
                    <div className="absolute top-0 right-24">
                        {props.home && <HomeHelpContainer/>}
                        {props.flashcard && <FlashcardHelpContainer/>}
                        {props.game && <GameHelpContainer/>}
                        {props.quiz && <QuizHelpContainer/>}
                    </div>
                )
            }
        </div>
    );
}

export default HelpButton;
