import React from 'react'
import { useNavigate } from 'react-router-dom'

function GuestButton(props) {    
    const navigate = useNavigate();
    const nav = (route) => {
        props.onClose(false);
        navigate(route);
      };
    return (
        <div className='w-[150px] h-[100px] rounded-lg bg-white flex flex-col justify-center items-center space-y-2'>
            <button onClick={() => nav('/register')} className='font-bold text-[20px]'>Register</button>
            <div className='border-y border-black w-[75%]'></div>
            <button onClick={() => nav('/login')} className=' font-bold text-[20px]'>Log In</button>            
        </div>
    )
}

export default GuestButton


