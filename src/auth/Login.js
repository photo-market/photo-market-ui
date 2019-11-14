import React from 'react';
import {Link} from "react-router-dom";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import Checkbox from "../common/checkbox/Checkbox";
import SeparatingLine from "../common/line/SeparatingLine";
import Button from "../common/button/Button";
import styles from './Auth.module.css';

export default () => {

    return (
        <main className={styles.authForm}>
            <h1>Welcome back!</h1>

            <div className={styles.formModal}>
                <form>
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
                    <Button content="Log In" wide="true"/>
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