import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuestContainer(props) {
    const [isLogin, setIsLogin] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);
    const [isQuized, setIsQuized] = useState(false);
    const [dailyPlay, setDailyPlay] = useState(0);
   
    useEffect(() => {
        const getQuestStatus = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/user', { withCredentials: true });
                setIsLogin(response.data.user.is_login);
                setIsPlayed(response.data.user.is_played);
                setIsQuized(response.data.user.is_quized);
                setDailyPlay(response.data.user.daily_play);
            } catch (error) {
                console.log(error);
            }
        };
        getQuestStatus();
        
    }, [props.isShown])

    return (
        <div className='w-[800px] h-[250px] bg-wordContainer rounded-[40px] border-4 border-black flex items-center justify-center'>
            <div className="flex-col space-y-7">
                <LogInQuestContainer isCompleted={isLogin} />
                <GameQuestContainer isCompleted={isPlayed} dailyPlay={dailyPlay} />
                <QuizQuestContainer isCompleted={isQuized} />
            </div>
        </div>
    )
}

function LogInQuestContainer(props) {
    const navigate = useNavigate();
    return (
        <div className='flex flex-row items-center space-x-4'>
            {
                props.isCompleted ? (<FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: '45px', color: "#288236" }} />
                ) : (
                    <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: '45px' }} />
                )
            }
            <button className="text-3xl text-primary font-black" onClick={() => navigate('/login')}>Log In</button>
            <p className=" text-lg font-bold">+100 points</p>
        </div>
    )
}

function GameQuestContainer(props) {
    const navigate = useNavigate();
    return (
        <div className='flex flex-row items-center space-x-4'>
            {
                props.isCompleted ? (<FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: '45px', color: "#288236" }} />
                ) : (
                    <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: '45px' }} />
                )
            }
            <div className="flex flex-row space-x-2">
                <p className="text-3xl font-black">{"Play"}</p>
                <button className="text-3xl text-primary font-black" onClick={() => navigate('/game')}>Game</button>
                <p className="text-3xl font-black">{"3 times"}</p>
            </div>
            <p className="text-3xl font-black">{`(${props.dailyPlay}/3)`}</p>
            <p className="text-lg font-bold">+300 points</p>
        </div>
    )
}

function QuizQuestContainer(props) {
    const navigate = useNavigate();
    return (
        <div className='flex flex-row items-center space-x-4'>
            {
                props.isCompleted ? (<FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: '45px', color: "#288236" }} />
                ) : (
                    <FontAwesomeIcon icon={faCircleXmark} style={{ fontSize: '45px' }} />
                )
            }
            <div className="flex flex-row space-x-2">
                <p className="text-3xl font-black">{"Do a"}</p>
                <button className="text-3xl text-primary font-black" onClick={() => navigate('/quiz')}>Quiz</button>
                <p className="text-3xl font-black">{"and get 5 score or more"}</p>
            </div>
            <p className="text-lg font-bold">+300 points</p>
        </div>
    )
}

export default QuestContainer