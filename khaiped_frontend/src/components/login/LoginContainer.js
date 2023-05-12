import React, { useState }  from 'react'
import { useNavigate } from "react-router-dom";

function RegisterContainer() {
    const [isCorrect, setIsCorrect] = useState(true)
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate();
    return (
        <div className="LoginContainer flex flex-col items-center space-y-12">
            <h1 className='font-black text-[80px]'>{'Log In'}</h1>
            <form className="form flex flex-col items-center space-y-7">
                <div className="flex flex-col space-y-10">
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
                </div>
                {<p className={`text-[20px] font-bold ${isSubmit ? (isCorrect ? 'opacity-0' : 'text-red-500') : 'opacity-0'}`}>
                    {isCorrect ? 'Registration Successfull' : 'Your Username is already taken'}
                </p>}
                <button type="submit" className='loginButton'>{'Log In'}</button>
                <div className="flex flex-row items-center space-x-2">
                <p className='font-bold '>Do not have account?</p>
                <button onClick={() => navigate("/register")} className= 'font-bold text-primary'>{'Register'}</button>                
                </div>
                
            </form>
            
        </div>
    )
}

export default RegisterContainer

//