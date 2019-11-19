import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import './App.css';

function App() {
    return (
        <Router>
            <Header/>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={lazy(() => import('../home/Home'))}/>
                    <Route path="/auth" component={lazy(() => import('../auth/AuthRouter'))}/>
                    <Route path="/terms" component={lazy(() => import('../policy/TermsOfUse'))}/>
                    <PrivateRoute path="/account" component={lazy(() => import('../account'))}/>
                    <Route component={lazy(() => import('./NotFound'))}/>
                </Switch>
            </Suspense>
            <Footer/>
        </Router>
    );
}

export default App;
