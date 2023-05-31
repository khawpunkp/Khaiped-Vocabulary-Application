import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = 'http://127.0.0.1:8000/word/random';

function Flashcard(props) {
    const buttonStyle = 'h-[37px] w-[37px] absolute bg-cover bg-center';
    const [wordData, setWordData] = useState(null);
    const [picSrc, setPicSrc] = useState(null);
    const [isFront, setIsFront] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const getWordData = () => {
        axios
            .get(`http://127.0.0.1:8000/word/${props.id}`, { withCredentials: true })
            .then(response => {
                setWordData(response.data.word);
                setPicSrc(response.data.word_root.pic)
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        // randomWord();
        getWordData();
    }, [props.id]);


    const flipCard = () => {
        setIsFront(!isFront);
    };

    return (
        <div className="contentBox flex items-center justify-center" onClick={flipCard}>
            {isLoading ? (
                <h1 className="px-[55px] text-[64px] font-bold text-center">Loading...</h1>
            ) : (!wordData ? (
                <h1 className="px-[55px] text-[64px] font-bold text-center">No word available</h1>
            ) : (isFront ? (
                <FrontCard wordData={wordData} buttonStyle={buttonStyle} />
            ) : (
                <BackCard wordData={wordData} picSrc={picSrc} />
            )))}

        </div>
    );
}

function FrontCard({ wordData, buttonStyle }) {
    const handleSoundClick = (event) => {
        event.stopPropagation();
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(wordData.word);
            speechSynthesis.speak(utterance);
        } else {
            console.log('Text-to-speech is not supported in this browser.');
        }
    };
    return (
        <div className="flex flex-col items-center">
            <h1 className="px-[55px] text-[64px] font-bold ">
                {wordData.word}
            </h1>
            <p className="px-[55px] font-bold">
                ({wordData.part_of_speech})
            </p>
            <button className={`sound ${buttonStyle} bottom-[20px] left-[20px]`} onClick={handleSoundClick}>
                <FontAwesomeIcon icon={faVolumeHigh} style={{ fontSize: '35px' }} />
            </button>
        </div>
    );
}

function BackCard({ wordData, picSrc }) {
    return (
        <div className="flex flex-col items-center space-y-9">
            {picSrc && (
                <img src={`http://127.0.0.1:8000/${picSrc}`} alt="Word Root" className="h-[100px] w-[100px]" />
            )}
            <h2 className=" text-6xl font-bold px-[55px] text-center">
                {wordData.tran_th}
            </h2>
            <h2 className="text-2xl font-bold px-[55px] text-center">
                {wordData.tran_eng}
            </h2>
        </div>
    );
}

export default Flashcard;
