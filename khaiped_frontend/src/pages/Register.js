import React, { useEffect, useState } from 'react'
import RegisterContainer from '../components/login/RegisterContainer'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Register() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {    
        axios
          .get(`${process.env.REACT_APP_API_URL}/user/user`, { withCredentials: true })
          .then(response => {
            setIsLogin(true);
          })
          .catch(error => {
            setIsLogin(false);
          });
      }, []);

      return (
        <div className="">
            {isLogin ? (<Navigate to='/' />) :
                (
                    <div className="content flex justify-center">
                        <RegisterContainer/>
                    </div>
                )
            }
        </div>
    );
}

export default Register