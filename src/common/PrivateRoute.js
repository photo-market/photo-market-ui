import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useAuth} from "./AuthProvider";

export default ({component: Component, roles, ...rest}) => {
    const auth = useAuth();
    return (
        <Route {...rest} render={(props) => {
            // Check authentication
            if (!auth.isAuthenticated) {
                return <Redirect to={{pathname: '/auth/login', state: {from: props.location}}}/>;
            }

            // Check authorization
            // const currentUser = authService.getCurrentUser();
            // if (roles && roles.indexOf(currentUser.role) === -1) {
            //     return <Redirect to={{pathname: '/'}}/>;
            // }

            return <Component {...props} />;
        }}/>
    );
};