import React, { useState } from "react";
import randomButton from "../../assets/svg/home/ButtonRandomEmpty.svg";
import cardButton from "../../assets/svg/home/ButtonCardEmpty.svg";
import gameButton from "../../assets/svg/home/ButtonGameEmpty.svg";
import quizButton from "../../assets/svg/home/ButtonQuizEmpty.svg";
import bookButton from "../../assets/svg/home/ButtonBookEmpty.svg";
import HomeButton from './HomeButton'
import MainWordContainer from "../word/MainWordContainer";
import { useNavigate } from 'react-router-dom'

function HomeButtonContainer() {
    const [rndWordPopUp, setRndWordPopUp] = useState(false)
    const navigate = useNavigate();

    return (
        <div className="relative">
            <div className="flex flex-col my-8 space-y-6">
                <div className="RandomButton" onClick={() => setRndWordPopUp(true)}>
                    <HomeButton buttonImg={randomButton} title="Random Word" description="New word you have never learn" />
                </div>
                <div className="CardButton">
                    <HomeButton buttonImg={cardButton} title="Flashcard" description="Memorise the word" />
                </div>
                <div className="GameButton">
                    <HomeButton buttonImg={gameButton} title="Word Scramble" description="Have fun!" />
                </div>
                <div className="QuizButton">
                    <HomeButton buttonImg={quizButton} title="Quiz" description="Let’s test your knowledge" />
                </div>
                <div className="DictButton" onClick={() => navigate("/dictionary")}>
                    <HomeButton buttonImg={bookButton} title="Dictionary" description="An ordinary dictionary" />
                </div>
            </div>
            {rndWordPopUp && <div className="fixed top-[70px] bottom-0 left-0 right-0 flex justify-center items-center">
                <MainWordContainer close = {true} sound = {true} refresh = {true}  onClose={() => setRndWordPopUp(false)}/>
            </div>}
        </div>
    )
}

export default HomeButtonContainer;