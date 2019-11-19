import React, {lazy} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

export default ({match}) => {

    return (
        <Switch>
            <Route exact path={`${match.path}/login`} component={lazy(() => import('./Login'))}/>
            <Route exact path={`${match.path}/confirm`} component={lazy(() => import('./ConfirmEmail'))}/>
            <Route exact path={`${match.path}/signup`} component={lazy(() => import('./Signup'))}/>
            <Route exact path={`${match.path}/forgot`} component={lazy(() => import('./Forgot'))}/>
            <Route render={() => <Redirect to={`${match.path}/login`}/>}/>
        </Switch>
    );

}