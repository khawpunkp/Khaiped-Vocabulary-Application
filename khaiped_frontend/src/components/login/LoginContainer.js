import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import SubmitButton from './SubmitButton';

function LogInContainer() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isCorrect, setIsCorrect] = useState(true)
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate();

    const submitLogin = (event) => {
        event.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API_URL}/user/login`, {
                username: username,
                password: password
            })
            .then((response) => {
                setIsCorrect(true);
                setIsSubmit(true);
                console.log(response);
                const { access, refresh } = response.data;
                localStorage.setItem('accessToken', access);
                localStorage.setItem('refreshToken', refresh);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            })
            .catch((error) => {
                setIsCorrect(false);
                setIsSubmit(true);
                console.log(error);
            });
    }

    return (
        <div className="LoginContainer flex flex-col items-center space-y-12">
            <h1 className='font-black text-[80px]'>{'Log In'}</h1>
            <form className="form flex flex-col items-center space-y-7" onSubmit={submitLogin}>
                <div className="flex flex-col space-y-10">
                    <div className='inputBox w-[400px]'>
                        <input type="username"
                            id="username"
                            placeholder="Username"
                            className="inputText"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="inputBox w-[400px]">
                        <input type="password"
                            id="password"
                            placeholder="Password"
                            className="inputText"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                </div>
                {<p className={`text-[20px] font-bold ${isSubmit ? (isCorrect ? 'text-green-500' : 'text-red-500') : 'opacity-0'}`}>
                    {isCorrect ? 'Login Successfull' : 'Incorrect Username or Password'}
                </p>}
                <button type="submit">
                    <SubmitButton text='Log In' />
                </button>
                <div className="flex flex-row items-center space-x-2">
                    <p className='font-bold '>Do not have account?</p>
                    <button onClick={() => navigate("/register")} className='font-bold text-primary'>{'Register'}</button>
                </div>
            </form>
        </div>
    )
}

export default LogInContainer

//