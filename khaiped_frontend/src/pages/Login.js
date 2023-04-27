import React, { useState } from 'react'

function Login() {
    return (
        <div className="RegisterContainer flex flex-col items-center">
            <h1 className='font-black text-[80px]'>{'Register'}</h1>
            <form className="form flex flex-col items-center">
                <div className='loginInput'>
                    <input type="username"
                        id="username"
                        placeholder="Username"
                        className="w-full bg-transparent pt-2 pb-1 outline-none text-lg placeholder-[#590070] placeholder-opacity-[0.28]" 
                    />
                </div>
                <div className="loginInput">
                    <input type="password"
                        id="password"
                        placeholder="Password"
                        className="w-full bg-transparent pt-2 pb-1 outline-none text-lg placeholder-[#590070] placeholder-opacity-[0.28]" 
                    />
                </div>
                <p className="text-[20px] font-bold text-red-500">Your Username is already taken</p>
                <button type="submit">{'Register'}</button>
            </form>
        </div>
    );
}

export default Login