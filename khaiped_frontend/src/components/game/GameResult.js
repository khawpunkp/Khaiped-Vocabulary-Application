import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

function GameResult() {
    const navigate = useNavigate();

    return (
        <div className={`relative w-[580px] h-[580px] bg-wordContainer rounded-[40px] border-4 border-black flex items-center justify-center`}>
            <h1 className="px-[55px] text-[64px] font-bold">Correct!</h1>
            <button className="h-[37px] w-[37px] absolute bottom-[20px] left-[20px] bg-cover bg-center"
                onClick={() => window.location.reload()}>
                <FontAwesomeIcon icon={faRefresh} style={{ fontSize: "35px" }} />
            </button>
            <button className="exit h-[37px] w-[37px] absolute bottom-[20px] right-[20px] bg-cover bg-center" onClick={() => navigate('/')}>
                <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: "35px" }} />
            </button>
        </div>
    )
}

export default GameResult