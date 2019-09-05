import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import './App.css';

const Home = lazy(() => import('../home/Home'));
const Signup = lazy(() => import('../signup/Signup'));
const Login = lazy(() => import('../login/Login'));
const NotFound = lazy(() => import('./NotFound'));

function App() {
    return (
        <Router>
            <Header/>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    {/*<PrivateRoute path="/account" component={Account}/>*/}
                    <Route component={NotFound}/>
                </Switch>
            </Suspense>
            <Footer/>
        </Router>
    );
}

export default App;
