import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function UserButton(props) {
  const navigate = useNavigate();
  const navToStatistic = () => {
    props.onClose(false);
    navigate('/statistic');
  };

  // const submitLogout = () => {
  //   axios
  //     .post('http://127.0.0.1:8000/user/logout')
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // const submitLogout(e) {
  //   e.preventDefault();
  //   axios.post(
  //     "http://127.0.0.1:8000/user/logout",
  //     { withCredentials: true }
  //   )
  //   props.onClose(false);
  // }

  const submitLogout = () => {
    axios
      .post(
        "http://127.0.0.1:8000/user/logout",
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
    <div className='w-[130px] h-[100px] rounded-lg bg-white flex flex-col justify-center items-center space-y-2'>
      <button onClick={() => navToStatistic()} className='font-bold text-[20px]'>Statistic</button>
      <div className='border-y border-black w-[75%]'></div>
      <form onSubmit={e => handleClickLogOut(e)}>
        <button className='font-bold text-[20px]'>Log Out</button>
      </form>
    </div>
  )
}

export default UserButton


