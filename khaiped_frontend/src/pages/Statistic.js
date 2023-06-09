import { React, useState, useEffect } from "react";
import StatContainer from '../components/statistic/StatContainer'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

function Statistic() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/`, { withCredentials: true })
      .then(response => {
        setUserData(response.data.user);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className='content flex justify-center'>
        <h1 className='font-black text-[80px] text-center'>Loading...</h1>
      </div> // Show a loading state while fetching the word
    )
  }

  return (
    <div className="content flex flex-col justify-center">
      {userData ? (
        <div className="space-y-6">
          <h1 className='font-black text-[80px] text-center'>{userData.username}'s Statistic</h1>
          <div>
            <StatContainer title='Word Learned' value={userData.word_learned_count} classifier='Words' learned={true} />
            <StatContainer title='Game Played' value={userData.game_played} classifier='Games' />
            <StatContainer title='Quiz Score' value={userData.quiz_percent} classifier='Percent' />
            <StatContainer title='Day Streak' value={userData.day_streak} classifier='Days' />
            <StatContainer title='Total Score' value={userData.score} classifier='Points' />
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </div>
  )
}

export default Statistic