// import * as React from "react";
// import {USER_AUTH_KEY, DEFAULT_USER_AUTH} from "./consts/userAuth";
//
// const useAuthHandler = (initialState) => {
//     const [auth, setAuth] = React.useState(initialState);
//
//     const setAuthStatus = (userAuth) => {
//         window.localStorage.setItem(
//             USER_AUTH_KEY,
//             JSON.stringify(userAuth)
//         );
//         setAuth(userAuth);
//     };
//
//     const setUnauthStatus = () => {
//         window.localStorage.clear();
//         setAuth(DEFAULT_USER_AUTH);
//     };
//
//     return {
//         auth,
//         setAuthStatus,
//         setUnauthStatus,
//     };
// };
//
// export default useAuthHandler;