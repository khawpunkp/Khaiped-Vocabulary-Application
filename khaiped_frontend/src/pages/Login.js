import React, { useState } from 'react'

function Login() {
    const [isCorrect, setIsCorrect] = useState(true)
    return (
        <div className="">
            <div className="content flex flex-row justify-evenly ">
                <div className="RegisterContainer flex flex-col items-center space-y-20">
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
                        {<p className={`text-[20px] font-bold ${isCorrect ? 'opacity-0' : 'text-red-500'}`}>Your Username is already taken</p>}
                        <button type="submit" className='loginButton'>{'Register'}</button>
                    </form>
                </div>
                <div className="border-x border-black h-[520px]" />
                <div className="LoginContainer flex flex-col items-center space-y-20">
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
                        <p className={`text-[20px] font-bold ${isCorrect ? 'opacity-0' : 'text-red-500'}`}>Incorrect Username or Password</p>
                        <button type="submit" className='loginButton'>{'Log In'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login