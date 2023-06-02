import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RankContainer from '../components/statistic/RankContainer';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getLeaderboard = async () => {
        axios.get('http://127.0.0.1:8000/user/leaderboard')
            .then((response) => {
                setLeaderboard(response.data.leaderboard);
                setCurrentUser(response.data.current_user);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        getLeaderboard();
    }, [])

    if (isLoading) {
        return (
            <div className='content flex justify-center'>
                <h1 className='font-black text-[80px] text-center'>Loading...</h1>
            </div> // Show a loading state while fetching the word
        )
    }

    if (!leaderboard) {
        return (
            <div className='content flex justify-center'>
                <h1 className='font-black text-[80px] text-center'>No user available</h1>
            </div> // Handle the case when wordData is empty
        )
    }

    return (
        <div className='content space-y-4 mt-4 flex flex-col'>
            <div className="font-black text-[80px] text-center">
                Leaderboard
            </div>
            <div className="space-y-5">
                {leaderboard.map((result) => (
                    <RankContainer key={result.id} rank={result.rank} username={result.username} score={result.score} />
                ))}
            </div>
            <div className="absolute bottom-20">
                <RankContainer rank={currentUser.rank} username={currentUser.username} score={currentUser.score} currentUser={true}/>
            </div>
        </div>
    )
}

export default Leaderboard