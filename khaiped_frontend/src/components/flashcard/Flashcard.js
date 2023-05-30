import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = 'http://127.0.0.1:8000/word/random';

function Flashcard() {
    const buttonStyle = 'h-[37px] w-[37px] absolute bg-cover bg-center';
    const [wordData, setWordData] = useState(null);
    const [picSrc, setPicSrc] = useState(null);
    const [isFront, setIsFront] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const randomWord = () => {
        axios
            .get(API_URL, { withCredentials: true })
            .then(response => {
                setWordData(response.data.word);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    };

    const getWordData = () => {
        axios
            .get(`http://127.0.0.1:8000/word/3`, { withCredentials: true })
            .then(response => {
                setWordData(response.data.word);
                setPicSrc(`http://127.0.0.1:8000/${response.data.word_root.pic}`)
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        randomWord();
        getWordData();
    }, []);

    if (isLoading) {
        return (
            <div className='content flex justify-center'>
                <h1 className='font-black text-[80px] text-center'>Loading...</h1>
            </div> // Show a loading state while fetching the word
        )
    }

    if (!wordData) {
        return (
            <div className='content flex justify-center'>
                <h1 className='font-black text-[80px] text-center'>No word available</h1>
            </div> // Handle the case when wordData is empty
        )
    }

    const flipCard = () => {
        setIsFront(!isFront);
    };

    return (
        <div className="contentBox flex items-center justify-center" onClick={flipCard}>
            {isFront ? (
                <FrontCard wordData={wordData} buttonStyle={buttonStyle}/>
            ) : (
                <BackCard wordData={wordData} picSrc={picSrc} />
            )}
        </div>
    );
}

function FrontCard({ wordData, buttonStyle }) {
    const handleSoundClick = (event) => {
        event.stopPropagation();
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
                <img src={picSrc} alt="Word Root" className="h-[100px] w-[100px]" />
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
