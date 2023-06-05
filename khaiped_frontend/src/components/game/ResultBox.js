import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

function ResultBox(props) {
    const navigate = useNavigate();

    return (
        <div className={`contentBox flex items-center justify-center`}>
            <div className="flex flex-col">
                <h1 className="px-[55px] text-[64px] font-bold text-center">{props.result}</h1>
                {props.subtext && <p className="px-[55px] text-[20px] font-bold text-center">{props.subtext}</p>}
            </div>
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

export default ResultBox