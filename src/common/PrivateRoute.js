import React from 'react';
import {Redirect, Route} from "react-router-dom";
import authService from "./Auth";

export default ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            authService.isAuthenticated() === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/auth/login',
                    state: {from: props.location}
                }}/>
        )}/>
    );
};