import axios from "axios";

export default {
    login,
    socialLogin,
    logout,
    register,
    getCurrentUser,
    isAuthenticated
};

function login(email, password) {
    return axios.post('/api/v1/auth/login', {email, password})
        .then(response => {
            //axios.defaults.headers.common['Authorization'] = response.token;
            createSession(response.data);
        });
}

function socialLogin(tokenId) {
    const data = {
        provider: 'google',
        token: tokenId
    };
    return axios.post(`/api/v1/auth/social-login`, data)
        .then(response => createSession(response.data));
}

function logout() {
    localStorage.removeItem('currentUser');
}

function register(user) {
    return axios.post('/api/v1/auth/register', user);
}

function isAuthenticated() {
    return 'currentUser' in localStorage;
}

function createSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}
