import React from 'react';
import {Link} from "react-router-dom";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import styles from './Login.module.css';
import Checkbox from "../common/checkbox/Checkbox";
import SeparatingLine from "../common/line/SeparatingLine";

export default () => {

    return (
        <main className={styles.authForm}>
            <h1>Welcome back</h1>

            <div className={styles.formModal}>
                <form>
                    <div>
                        <label htmlFor="email-label" className={styles.inputLabel}>
                            Email address
                        </label>
                        <input id="email-label"
                               type="email"
                               name="email"
                               maxLength="255"
                               className={styles.inputText}
                               autoComplete="currentUsername"
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
                        />
                    </div>
                    <div className={styles.rememberMe}>
                        <Checkbox content="Remember me"/>
                        <Link to="/auth/forgot">Forgot password?</Link>
                    </div>
                    <button className={styles.wide}>Log In</button>
                </form>

                <SeparatingLine content="OR"/>

                <p className={styles.termsWarning}>
                    By clicking Log In with Facebook or Log In with Google,
                    you agree to the <Link to="/terms" target="_blank">Terms of Use</Link>
                    and <Link to="/privacy" target="_blank">Privacy Policy</Link>.
                </p>

                <GoogleButton/>
                <FacebookButton/>
            </div>

            <p className={styles.afterwords}>
                Don’t have an account? <Link to="/register">Sign up.</Link>
            </p>

        </main>
    );
}