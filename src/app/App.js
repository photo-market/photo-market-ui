import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import './App.css';

const Home = lazy(() => import('../home/Home'));
const Signup = lazy(() => import('../auth/Signup'));
const Login = lazy(() => import('../auth/Login'));
const Account = lazy(() => import('../account'));
const NotFound = lazy(() => import('./NotFound'));

function App() {
    return (
        <Router>
            <Header/>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/auth/login" component={Login}/>
                    <Route path="/auth/signup" component={Signup}/>
                    <PrivateRoute path="/account" component={Account}/>
                    <Route component={NotFound}/>
                </Switch>
            </Suspense>
            <Footer/>
        </Router>
    );
}

export default App;
