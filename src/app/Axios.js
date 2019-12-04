import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-


const UNAUTHORIZED = 401;
axios.interceptors.response.use(response => response, error => {
        const {status} = error.response;
        if (status === UNAUTHORIZED) {
            // dispatch(userSignOut());
        }
        return Promise.reject(error);
    }
);