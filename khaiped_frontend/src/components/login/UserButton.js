import React from 'react'

function LoginButton() {
    return (
        <div className='w-[130px] h-[100px] rounded-lg bg-white flex flex-col justify-center items-center space-y-2'>
            <button className='font-bold text-[20px]'>Statistic</button>    
            <div className='border-b border-black w-[75%]'></div>        
            <button className='font-bold text-[20px]'>Log Out</button>
        </div>
    )
}

export default LoginButton


