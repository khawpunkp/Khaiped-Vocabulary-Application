import React, { useEffect, useState } from 'react'
import LoginContainer from '../components/login/LoginContainer'
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/user/`, { withCredentials: true })
            .then(response => {
                setIsLogin(true);
                // console.log(response);
            })
            .catch(error => {
                setIsLogin(false);
                // console.log(error);
            });
    }, []);

    return (
        <div className="">
            {isLogin ? (<Navigate to='/' />) :
                (
                    <div className="content flex justify-center">
                        <LoginContainer />
                    </div>
                )
            }
        </div>
    );
}

export default Login