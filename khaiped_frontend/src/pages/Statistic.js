import { React, useState, useEffect } from "react";
import StatContainer from '../components/statistic/StatContainer'
import axios from 'axios'

function Statistic() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/user/user', { withCredentials: true })
      .then(response => {
        setUserData(response.data.user);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="content flex flex-col justify-center">
      {userData ? (
        <div className="space-y-6">
          <h1 className='font-black text-[80px] text-center'>{userData.username}'s Statistic</h1>
          <div>
            <StatContainer title='Word Learned' value={userData.word_learned_count} classifier='Words' />
            <StatContainer title='Game Played' value={userData.game_played} classifier='Games' />
            <StatContainer title='Quiz Score' value={((userData.quiz_score) / (userData.quiz_taken)) * 100} classifier='Percent' />
            <StatContainer title='Day Streak' value={userData.day_streak} classifier='Days' />
          </div>
        </div>
      ) : (
        <h1 className='font-black text-[80px] text-center'>Loading...</h1>
      )}
    </div>
  )
}

export default Statistic