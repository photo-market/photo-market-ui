import React, {lazy} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

export default ({match}) => {

    return (
        <Switch>
            <Route exact path={`${match.path}/profile`} component={lazy(() => import('./Profile'))}/>
            <Route render={() => <Redirect to={`${match.path}/profile`}/>}/>
        </Switch>
    );

}