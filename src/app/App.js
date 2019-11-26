import React, {lazy, Suspense} from 'react';
// import {withAuthenticator} from 'aws-amplify-react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faCheckSquare, faChevronDown, faCoffee} from '@fortawesome/free-solid-svg-icons'
import PrivateRoute from "../common/PrivateRoute";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import './App.css';
import Amplify from "aws-amplify";

// Auth configuration
Amplify.configure({
    Auth: {
        region: 'us-east-1',
        userPoolId: 'us-east-1_e4yWOhKOu',
        userPoolWebClientId: 'eag4fq1gp84ac5c5s0r98g18p',
    },
    //  Hosted UI configuration
    oauth: {
        domain: "photo-market-prod.auth.us-east-1.amazoncognito.com",
        //clientID: '',
        //redirectUri: '',
        //audience: 'https://your_domain/userinfo',
        scope: ['email', 'openid'],
        // redirectSignIn: "https://photo-market.club/auth/callback",
        // redirectSignOut: "https://photo-market.club/auth/sign-out",
        redirectSignIn: "http://localhost:3000/auth/callback",
        redirectSignOut: "http://localhost:3000/auth/sign-out",
        responseType: "token"
    }
});

// Pre-load icons
library.add(fab, faChevronDown, faCheckSquare, faCoffee);

function App() {
    return (
        <Router>
            <Header/>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={lazy(() => import('../home/Home'))}/>
                    <Route path="/auth" component={lazy(() => import('../auth/AuthRouter'))}/>
                    <Route path="/terms" component={lazy(() => import('../policy/TermsOfUse'))}/>

                    <PrivateRoute path="/account"
                                  component={lazy(() => import('../account/AccountRouter'))}/>
                    <PrivateRoute path="/admin"
                                  roles={['ADMIN']}
                                  component={lazy(() => import('../admin/AdminRouter'))}/>

                    <Route component={lazy(() => import('./NotFound'))}/>
                </Switch>
            </Suspense>
            <Footer/>
        </Router>
    );
}

export default App;
// export default withAuthenticator(App);
