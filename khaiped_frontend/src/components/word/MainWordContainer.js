import { React, useState, useEffect } from "react";
import axios from 'axios'
import { faRefresh, faVolumeHigh, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MainWordContainer(props) {
    const [wordData, setWordData] = useState(null);

    const buttonStyle = 'h-[37px] w-[37px] absolute bg-cover bg-center'

    const randomWord = () => {
        axios
            .get('http://127.0.0.1:8000/word/random', { withCredentials: true })
            .then(response => {
                setWordData(response.data.word);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const getWordData = () => {
        axios
            .get(`http://127.0.0.1:8000/word/${props.wordID}`, { withCredentials: true })
            .then(response => {
                setWordData(response.data.word);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        // console.log('use effect');
        if (props.isRandom) {
            randomWord();
        }
        else {
            getWordData()
        }
        // }
    }, []);

    const handleClose = () => {
        props.onClose(false);
    };

    return (
        <div className={`contentBox  ${wordData ? ' ' : 'flex items-center justify-center'}`}>
            {wordData ? (
                <div className="flex flex-col items-center">
                    <h1 className="h-[100px] px-[55px] text-[64px] font-bold absolute top-[25%]">{wordData.word}</h1>
                    <p className="h-[100px] px-[55px] font-bold absolute top-[40%]">({wordData.part_of_speech})</p>
                    <h2 className="thai text-2xl font-bold px-[55px] absolute top-[50%]">{wordData.tran_th}</h2>
                    <h2 className="text-2xl font-bold px-[55px] text-center absolute top-[65%]">{wordData.tran_eng}</h2>
                </div>
            ) : (
                <h1 className="px-[55px] text-[64px] font-bold text-center">No words available</h1>
            )}
            {
                props.close && <button className={`close ${buttonStyle}  top-[20px] right-[20px]`}
                    onClick={() => handleClose()}
                >
                    <FontAwesomeIcon icon={faXmarkCircle} style={{ fontSize: "35px" }} />
                </button>
            }
            {
                props.sound && <button className={`sound ${buttonStyle} bottom-[20px] left-[20px]`}>
                    <FontAwesomeIcon icon={faVolumeHigh} style={{ fontSize: "35px" }} />
                </button>
            }
            {
                props.refresh && <button className={`refresh ${buttonStyle} bottom-[20px] right-[20px]`}
                    onClick={() => randomWord()}
                >
                    <FontAwesomeIcon icon={faRefresh} style={{ fontSize: "35px" }} />
                </button>}
        </div>
    )
}

export default MainWordContainer;