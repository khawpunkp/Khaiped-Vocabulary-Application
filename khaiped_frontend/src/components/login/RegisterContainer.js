import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import SubmitButton from './SubmitButton';

function RegisterContainer() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isCorrect, setIsCorrect] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const submitRegister = (event) => {
        event.preventDefault();
        axios
            .post(`${process.env.REACT_APP_API_URL}/user/register`, {
                username: username,
                password: password
            })
            .then(response => {
                setIsCorrect(true);
                setIsSubmit(true);
                console.log('success');
                setTimeout(() => {
                    navigate('/login'); 
                }, 1000);                
            })
            .catch(error => {
                setIsCorrect(false);
                setIsSubmit(true);
            });
    }

    return (
        <div className="RegisterContainer flex flex-col items-center space-y-12">
            <h1 className='font-black text-[80px]'>{'Register'}</h1>
            <form className="form flex flex-col items-center space-y-7" onSubmit={submitRegister}>
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
                    {isCorrect ? 'Registration Successfull' : 'Your Username is already taken'}
                </p>}
                <button type="submit">
                <SubmitButton text='Register'/>
                </button>
                <div className="flex flex-row items-center space-x-2">
                    <p className='font-bold '>Already have account?</p>
                    <button onClick={() => navigate("/login")} className='font-bold text-primary'>{'Log In'}</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterContainer