import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import QuestContainer from './QuestContainer';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function QuestButton() {
    const [isShown, setIsShown] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const refQuestButton = useRef();
    const location = useLocation();

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

    useEffect(() => {
        const getQuestStatus = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/user', { withCredentials: true });
                setIsCompleted(response.data.user.is_login && response.data.user.is_played && response.data.user.is_quized)                
            } catch (error) {
                console.log(error);
                setIsCompleted(false);
            }
        };
        getQuestStatus();        
    }, [location, isShown])

    return (
        <div className="relative">
            <button
                className="rounded-full bg-[#D885FF] w-[100px] h-[100px] border-[3px] border-black flex items-center justify-center"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                onClick={() => setIsShown(!isShown)}
                ref={refQuestButton}
            >
                <FontAwesomeIcon icon={faClipboardCheck} style={{ fontSize: '55px' }} />
            </button>
            {!isCompleted && (<div className="rounded-full bg-red-600 w-[25px] h-[25px] absolute top-0 right-0"></div>)}
            {isShown && (
                <div className="absolute top-0 left-32">
                    <QuestContainer isShown={isShown}/> 
                </div>
            )}
        </div>
    );
}

export default QuestButton;
