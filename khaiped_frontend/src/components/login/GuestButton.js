import React from 'react'
import { useNavigate } from 'react-router-dom'

function GuestButton(props) {    
    const navigate = useNavigate();
    const handleClick = () => {
        props.onClose(false);
        navigate('/login');
    };
    return (
        <div className='w-[130px] h-[50px] rounded-lg bg-white flex justify-center items-center'>
            <button onClick={() => handleClick()} className=' font-bold text-[20px]'>Log In</button>            
        </div>
    )
}

export default GuestButton


