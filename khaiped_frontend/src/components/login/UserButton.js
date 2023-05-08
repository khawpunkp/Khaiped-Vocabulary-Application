import React from 'react'
import { useNavigate } from 'react-router-dom';

function UserButton(props) {
    const navigate = useNavigate();
    const navToStatistic = () => {
        props.onClose(false);
        navigate('/statistic');
    };
    return (
        <div className='w-[130px] h-[100px] rounded-lg bg-white flex flex-col justify-center items-center space-y-2'>
            <button onClick={() => navToStatistic()} className='font-bold text-[20px]'>Statistic</button>    
            <div className='border-y border-black w-[75%]'></div>        
            <button className='font-bold text-[20px]'>Log Out</button>
        </div>
    )
}

export default UserButton


