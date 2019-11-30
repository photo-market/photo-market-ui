import {useState, useEffect} from 'react';
import axios from 'axios';
import utils from './util';

const URL = process.env.REACT_APP_API_URL;

// Provider hook that creates auth object and handles state
export default function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            setUser(savedUser);
            setIsAuthenticated(true);
        }
    }, []);

    const signIn = ({email, password, rememberMe}) => {
        const body = {email, password, device: utils.getBrowserInfo()};
        return axios.post(`${URL}/auth/login`, body)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setUser(data.user);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(data.user));
                return user;
            })
            .catch(err => {
                throw err.response.data;
            });
    };

    const socialSignIn = () => {

    };

    const signUp = (data) => {
        return axios.post(`${URL}/auth/signup`, data)
            .then(res => res.data)
            .then(res => {
                setUser(res);
                setIsAuthenticated(true);
                return res;
            })
            .catch(err => {
                throw err.response.data;
            });
    };

    const signOut = () => {
        return axios.post(`${URL}/auth/logout`, user)
            .then(res => res.data)
            .then((data) => {
                localStorage.removeItem('user');
                setIsAuthenticated(false);
                setUser({});
                return data;
            })
            .catch(err => {
                throw err.response.data;
            });
    };

    const sendPasswordResetEmail = email => {
        return axios.post(`${URL}/auth/forgot`, {email})
            .then(res => res.data)
            .then(data => {
                return true;
            })
            .catch(err => {
                throw err.response.data;
            });
    };

    const resetPassword = (body) => {
        return axios.post(`${URL}/auth/reset-password`, body)
            .then(res => res.data)
            .then(data => {
                return true;
            })
            .catch(err => {
                throw err.response.data;
            });
    };

    const confirmAccount = () => {

    };

    const sendConfirmationCode = () => {

    };

    // Return the user object and auth methods
    return {
        user,
        isAuthenticated,
        signIn,
        socialSignIn,
        signUp,
        signOut,
        sendPasswordResetEmail,
        resetPassword,
        confirmAccount,
        sendConfirmationCode,
    };
}
