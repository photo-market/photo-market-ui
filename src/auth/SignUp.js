import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Button from "../common/button/Button";
import SeparatingLine from "../common/line/SeparatingLine";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import auth from '../common/Auth';
import styles from "./Auth.module.css";

export default (props) => {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationNeeded, setConfirmationNeeded] = useState(false);

    useEffect(() => {
        if (confirmationNeeded) {
            props.history.push(`/auth/confirm?email=${email}`); // pass email param?
        }
    });

    function handleSignup(e) {
        e.preventDefault();
        setLoading(true);
        const user = {email, password, firstName, lastName};
        auth.register(user)
            .then((res) => {
                console.log('Successfully signed-up.');
                setConfirmationNeeded(true);
            })
            .catch((err) => {
                console.log('SignUp: Something happened during registration.' + JSON.stringify(err));
                switch (err) {
                    case 'InvalidParameterException':
                        setError('Check your password');
                        break;
                    default:
                        setError('Unknown error. Please try again later.');
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <main className={styles.authForm}>
            <h1>Create an account</h1>
            <div className={styles.formModal}>
                <p className={styles.error}>{error}</p>
                <form onSubmit={handleSignup} noValidate>
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
                                   type="text"
                                   required={true}
                                   disabled={isLoading}
                                   value={firstName}
                                   onChange={(e) => setFirstname(e.target.value)}
                            />
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
                                   type="text"
                                   required={true}
                                   disabled={isLoading}
                                   value={lastName}
                                   onChange={(e) => setLastname(e.target.value)}
                            />
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
                               required={true}
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
                               maxLength={255}
                               minLength={6}
                               pattern="^[\S]+.*[\S]+$"
                               className={styles.inputText}
                               autoComplete="currentPassword"
                               required={true}
                               disabled={isLoading}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button disabled={isLoading}
                            loading={isLoading}
                            wide={true}>Create account</Button>
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