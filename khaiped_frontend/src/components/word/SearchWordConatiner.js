import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MainWordContainer from "./MainWordContainer";

function SearchWordContainer(props) {
    const [wordData, setWordData] = useState(null);
    const [wordPopUp, setWordPopUp] = useState(false)

    useEffect(() => {
        const getWord = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/word/${props.wordID}`);
                setWordData(response.data.word);
            } catch (error) {
                console.error(error);
            }
        };

        getWord();
    }, [props.wordID]);    

    return (
        <div className="border-y-2 border-black w-fit">
            <div className=''>
                {wordData ? (
                    <div className="flex flex-row items-center py-2 space-x-5">
                        <h1 className="w-[500px] thai text-4xl font-bold text-left">{wordData.word}</h1>
                        <h2 className="w-[380px] thai text-3xl font-bold text-left">{wordData.tran_th}</h2>
                        <button onClick={() => setWordPopUp(true)} className='text-left'>
                            <FontAwesomeIcon icon={faEye} style={{ fontSize: "30px" }} />
                        </button>
                    </div>
                ) : (
                    <h1 className="text-2xl font-bold">No words available</h1>
                )}
            </div>
            {
                wordPopUp && <div className="fixed top-[70px] bottom-0 left-0 right-0 flex justify-center items-center">
                    <MainWordContainer
                        close={true}
                        sound={true}
                        refresh={false}
                        isRandom={false}
                        wordID={wordData.id}
                        onClose={() => setWordPopUp(false)
                        } />
                </div>
            }
        </div>
    )
}

export default SearchWordContainer