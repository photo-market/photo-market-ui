import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import Checkbox from "../common/checkbox/Checkbox";
import SeparatingLine from "../common/line/SeparatingLine";
import Button from "../common/button/Button";
import styles from './Auth.module.css';
import auth from '../common/Auth';

export default (props) => {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationNeeded, setConfirmationNeeded] = useState(false);

    useEffect(() => {
        if (confirmationNeeded) {
            props.history.push('/auth/confirm');
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            setError("You need to specify email and password!");
            return;
        }
        setLoading(true);
        auth.login(email, password)
            .then((res) => {
                console.log('then: ok');
            })
            .catch((err) => {
                console.log('catch: error happened');
                switch (err) {
                    case  'NotAuthorizedException':
                        setError('Incorrect email of password.');
                        break;
                    case 'UserNotConfirmedException':
                        setConfirmationNeeded(true);
                        break;
                    default:
                        setError('Unkown error.');
                }
            })
            .finally(() => {
                console.log('finally: error happened');
                setLoading(false);
            })
    }

    return (
        <main className={styles.authForm}>
            <h1>Welcome back!</h1>

            <p>{error}</p>

            <div className={styles.formModal}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email-label"
                               className={styles.inputLabel}>
                            Email address
                        </label>
                        <input id="email-label"
                               type="email"
                               name="email"
                               maxLength="255"
                               className={styles.inputText}
                               autoComplete="currentUsername"
                               required={true}
                               max="256"
                               disabled={isLoading}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password-label" className={styles.inputLabel}>
                            Password
                        </label>
                        <input id="password-label"
                               type="password"
                               name="password"
                               maxLength="255"
                               className={styles.inputText}
                               autoComplete="currentPassword"
                               required={true}
                               disabled={isLoading}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.rememberMe}>
                        <Checkbox content="Remember me" disabled={isLoading}/>
                        <Link to="/auth/forgot">Forgot password?</Link>
                    </div>
                    <Button
                        disabled={isLoading}
                        content="Log In"
                        wide="true"
                    />
                </form>

                <SeparatingLine content="OR"/>

                <GoogleButton text="Login using Google"/>
                <FacebookButton text="Login using Facebook"/>
            </div>

            <p className={styles.afterwords}>
                Don’t have an account? <Link to="/auth/signup">Sign up.</Link>
            </p>

        </main>
    );
}