import React from 'react';
import Checkbox from "../common/checkbox/Checkbox";
import {Link} from "react-router-dom";
import Button from "../common/button/Button";
import SeparatingLine from "../common/line/SeparatingLine";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import styles from "./Auth.module.css";

export default () => {

    return (
        <main className={styles.authForm}>
            <h1>Create an account</h1>

            <div className={styles.formModal}>
                <form>
                    <div className={styles.twoColumns}>
                        <div>
                            <label className={styles.inputLabel}
                                   htmlFor="firstname-label">
                                First name
                            </label>
                            <input className={styles.inputText}
                                   id="firstname-label"
                                   maxLength="255"
                                   name="firstname"
                                   type="text"/>
                        </div>
                        <div>
                            <label className={styles.inputLabel}
                                   htmlFor="lastname-label">
                                Last name
                            </label>
                            <input className={styles.inputText}
                                   id="lastname-label"
                                   maxLength="255"
                                   name="lastname"
                                   type="text"/>
                        </div>
                    </div>
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
                    <Button content="Create account" wide="true"/>
                </form>

                <SeparatingLine content="OR"/>

                <GoogleButton text="Signup with Google"/>
                <FacebookButton text="Signup with Facebook"/>

                <p className={styles.termsWarning}>
                    By signing up, you agree to our&nbsp;
                    <Link to="/terms-of-use" target="_blank">
                        Terms of Service
                    </Link>
                </p>
            </div>

            <p className={styles.afterwords}>
                Already have an account? <Link to="/auth/login">Login here.</Link>
            </p>

        </main>
    );
}