import React from "react";
import randomButton from "../../assets/svg/home/ButtonRandomEmpty.svg";
import cardButton from "../../assets/svg/home/ButtonCardEmpty.svg";
import gameButton from "../../assets/svg/home/ButtonGameEmpty.svg";
import quizButton from "../../assets/svg/home/ButtonQuizEmpty.svg";
import bookButton from "../../assets/svg/home/ButtonBookEmpty.svg";
import HomeButton from './HomeButton'

function HomeButtonContainer(){
    return(
        <div className="flex flex-col my-8 space-y-4">
            <div className="RandomButton">
                <HomeButton buttonImg = {randomButton} title = "Random Word" description = "New word you have never learn"/>
            </div>
            <div className="CardButton">
                <HomeButton buttonImg = {cardButton} title = "Flashcard" description = "Memorise the word"/>
            </div>
            <div className="GameButton">
                <HomeButton buttonImg = {gameButton} title = "Word Scramble" description = "Have fun!"/>
            </div>
            <div className="QuizButton">
                <HomeButton buttonImg = {quizButton} title = "Quiz" description = "Let’s test your knowledge"/>
            </div>
            <div className="DictButton">
                <HomeButton buttonImg = {bookButton} title = "Dictionary" description = "An ordinary dictionary"/>
            </div>
        </div>
    )
}

export default HomeButtonContainer;