import {useState, useEffect} from 'react';
import axios from 'axios';

// Provider hook that creates auth object and handles state
export default function useProvideAuth() {
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        console.log('useProvideAuth: useEffect');
        // TODO check session validity on server
        const savedUser = JSON.parse(localStorage.getItem('user')); // or load from server
        if (savedUser) {
            setUser(savedUser);
            setIsAuthenticated(true);
        }
    }, []);

    function signIn({email, password, rememberMe}) {
        const body = {email, password};
        return axios.post(`/auth/login`, body)
            .then(res => res.data)
            .then(data => {
                setUser(data.user);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(data.user));
                return user;
            })
            .catch(err => {
                throw err.response.data;
            });
    }

    function socialSignIn(provider) {
        return axios.post(`/auth/social/${provider}`);
    }

    function signUp(data) {
        return axios.post(`/auth/signup`, data)
            .then(res => res.data)
            .then(res => {
                setUser(res);
                setIsAuthenticated(true);
                return res;
            })
            .catch(err => {
                throw err.response.data;
            });
    }

    function signOut() {
        console.log('AJAX: signOut')
        return axios.post(`/auth/logout`)
            .then(res => res.data)
            .then(data => {
                localStorage.removeItem('user');
                setIsAuthenticated(false);
                setUser({});
                return data;
            })
            .catch(err => {
                throw err.response.data;
            });
    }

    function sendPasswordResetEmail(email) {
        return axios.post(`/auth/forgot`, {email})
            .then(res => res.data)
            .then(data => {
                return true;
            })
            .catch(err => {
                throw err.response.data;
            });
    }

    function resetPassword(body) {
        return axios.post(`/auth/reset-password`, body)
            .then(res => res.data)
            .then(data => {
                return true;
            })
            .catch(err => {
                throw err.response.data;
            });
    }

    function confirmAccount() {

    }

    function sendConfirmationCode() {

    }

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
