import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './Icons';
import './Analytics';
import {ProvideAuth} from "../common/AuthProvider";
import PrivateRoute from "../common/PrivateRoute";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import './App.css';

function App() {
    return (
        <ProvideAuth>
            <Router>
                <Header/>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={lazy(() => import('../home/Home'))}/>
                        <Route path="/auth" component={lazy(() => import('../auth/AuthRouter'))}/>
                        <Route path="/portfolio/:userId" component={lazy(() => import('../portfolio/Portfolio'))}/>
                        <Route path="/chat" component={lazy(() => import('../chat/Chat'))}/>
                        <Route path="/terms" component={lazy(() => import('../policy/TermsOfUse'))}/>
                        <PrivateRoute path="/account" component={lazy(() => import('../account/AccountRouter'))}/>
                        <PrivateRoute path="/admin" component={lazy(() => import('../admin/AdminRouter'))}/>
                        <Route component={lazy(() => import('./NotFound'))}/>
                    </Switch>
                </Suspense>
                <Footer/>
            </Router>
        </ProvideAuth>
    );
}

export default App;
