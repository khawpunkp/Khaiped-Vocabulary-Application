import { useEffect } from 'react';
import axios from 'axios';

const TOKEN_REFRESH_INTERVAL = 2.9 * 60 * 60 * 1000; // Refresh every 2.9 hours

const TokenRefresh = () => {
    useEffect(() => {
        const refreshTimeout = setTimeout(refreshToken, TOKEN_REFRESH_INTERVAL);

        // Clear the timer when the component unmounts
        return () => clearTimeout(refreshTimeout);
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/token-refresh`, { refresh: localStorage.getItem('refreshToken') });

            // Update the access token in storage or global state
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);

            // Set up the next token refresh
            setTimeout(refreshToken, TOKEN_REFRESH_INTERVAL);
        } catch (error) {
            await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    };

    return null; // or render any UI if needed
};

export default TokenRefresh;