import React, { useEffect, useState } from 'react'
import SearchWordContainer from '../components/word/SearchWordConatiner'
import { useParams } from 'react-router-dom';
import axios from 'axios';


function WordLearnedPage() {
    const [results, setResults] = useState([]);
    const [username, setUsername] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getWords = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/word/word-learned`
            );
            setResults(response.data.words);
            setUsername(response.data.username);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getWords()
    }, [])

    if (isLoading) {
        return (
          <div className='content flex justify-center'>
            <h1 className='font-black text-[80px] text-center'>Loading...</h1>
          </div> // Show a loading state while fetching the word
        )
    }

    return (
        <div className=''>
            {results ? (
                <div className="content space-y-4 mt-4 flex flex-col">
                    <div className="font-black text-[80px] text-center">
                    {username}'s Learned Words
                    </div>
                    <div className="space-y-2">
                        {results.map((result) => (
                            <SearchWordContainer key={result.id} wordID={result.id} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="content flex justify-center">
                    <h1 className="font-black text-[80px] text-center">You have not learned any words!</h1>
                </div>
            )}
        </div>
    );
}

export default WordLearnedPage