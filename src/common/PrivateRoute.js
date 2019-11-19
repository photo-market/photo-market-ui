import React from 'react';
import {Redirect, Route} from "react-router-dom";
import authService from "./Auth";

export default ({component: Component, roles, ...rest}) => {
    return (
        <Route {...rest} render={(props) => {
            // Check authentication
            if (!authService.isAuthenticated()) {
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