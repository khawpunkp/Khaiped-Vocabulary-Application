import { React, useState, useEffect } from "react";
import closeButton from "../../assets/svg/mainWordContainer/Close.svg"
import refreshButton from "../../assets/svg/mainWordContainer/Refresh.svg"
import soundButton from "../../assets/svg/mainWordContainer/Sound.svg"
import axios from 'axios'

function MainWordContainer(props) {
    const [wordData, setWordData] = useState(null);
    // const [isRandom, setIsRandom] = useState(false);

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



    useEffect(() => {
        const getWord = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/word/${props.wordID}`);
                setWordData(response.data.word);
            } catch (error) {
                console.error(error);
            }
        };

        if (props.isRandom) {
            randomWord()
            console.log('random');
        }
        else {
            getWord()
            console.log(props.wordID);
            console.log('not');
        }
    }, [props.isRandom, props.wordID]);

    const handleClose = () => {
        props.onClose(false);
    };

    return (
        <div className={`relative w-[580px] h-[580px] bg-wordContainer rounded-[40px] border-4 border-black  ${wordData ? ' ' : 'flex items-center justify-center'}`}>
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
            {props.close && <button className="close h-[37px] w-[37px] absolute top-[20px] right-[20px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${closeButton})`
                }}
                onClick={() => handleClose()}
            ></button>}
            {props.sound && <button className="sound h-[37px] w-[37px] absolute bottom-[20px] left-[20px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${soundButton})`
                }}></button>}
            {props.refresh && <button className="refresh h-[37px] w-[37px] absolute bottom-[20px] right-[20px] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${refreshButton})`
                }}
                onClick={() => randomWord()}
            ></button>}
        </div>
    )
}

export default MainWordContainer;