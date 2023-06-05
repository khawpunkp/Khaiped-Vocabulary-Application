import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function UserButton(props) {
  const navigate = useNavigate();
  
  const nav = (route) => {
    props.onClose(false);
    navigate(route);
  };

  const submitLogout = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/logout`,
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleClickLogOut = (e) => {
    e.preventDefault();    
    submitLogout();
    props.onClose(false);
    navigate("/")
  };

  return (
    <div className='w-[150px] h-[150px] rounded-lg bg-white flex flex-col justify-center items-center space-y-2'>
      <button onClick={() => nav('/statistic')} className='font-bold text-[20px]'>Statistic</button>
      <div className='border-y border-black w-[75%]'></div>
      <button onClick={() => nav('/leaderboard')} className='font-bold text-[20px]'>Leaderboard</button>
      <div className='border-y border-black w-[75%]'></div>
      <form onSubmit={e => handleClickLogOut(e)}>
        <button className='font-bold text-[20px]'>Log Out</button>
      </form>
    </div>
  )
}

export default UserButton


