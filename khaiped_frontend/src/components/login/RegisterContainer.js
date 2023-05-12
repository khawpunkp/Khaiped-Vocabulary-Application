import React, { useState }  from 'react'
import { useNavigate } from "react-router-dom";

function RegisterContainer() {
    const [isCorrect, setIsCorrect] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate();
    return (
        <div className="RegisterContainer flex flex-col items-center space-y-12">
            <h1 className='font-black text-[80px]'>{'Register'}</h1>
            <form className="form flex flex-col items-center space-y-7">
                <div className="flex flex-col space-y-10">
                    <div className='loginInput'>
                        <input type="username"
                            id="registUsername"
                            placeholder="Username"
                            className="w-full bg-transparent pt-2 pb-1 outline-none text-lg placeholder-[#590070] placeholder-opacity-[0.28]"
                        />
                    </div>
                    <div className="loginInput">
                        <input type="password"
                            id="registPassword"
                            placeholder="Password"
                            className="w-full bg-transparent pt-2 pb-1 outline-none text-lg placeholder-[#590070] placeholder-opacity-[0.28]"
                        />
                    </div>
                </div>
                {<p className={`text-[20px] font-bold ${isSubmit ? (isCorrect ? 'text-green-500' : 'text-red-500') : 'opacity-0'}`}>
                    {isCorrect ? 'Registration Successfull' : 'Your Username is already taken'}
                </p>}
                <button type="submit" className='loginButton'>{'Register'}</button>
                <div className="flex flex-row items-center space-x-2">
                <p className='font-bold '>Already have account?</p>
                <button onClick={() => navigate("/login")} className= 'font-bold text-primary'>{'Log In'}</button>                
                </div>
            </form>
        </div>
    )
}

export default RegisterContainer