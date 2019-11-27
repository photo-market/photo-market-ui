import React, {lazy} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

export default ({match}) => {

    return (
        <Switch>
            <Route exact path={`${match.path}/login`} component={lazy(() => import('./SignIn'))}/>
            <Route exact path={`${match.path}/sign-out`} component={lazy(() => import('./SignOut'))}/>
            <Route exact path={`${match.path}/signup`} component={lazy(() => import('./SignUp'))}/>
            <Route exact path={`${match.path}/confirm`} component={lazy(() => import('./ConfirmEmail'))}/>
            <Route exact path={`${match.path}/forgot`} component={lazy(() => import('./ForgotPassword'))}/>
            <Route exact path={`${match.path}/reset/:code`} component={lazy(() => import('./ResetPassword'))}/>
            <Route render={() => <Redirect to={`${match.path}/login`}/>}/>
        </Switch>
    );

}