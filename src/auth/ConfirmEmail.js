import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Button from "../common/button/Button";
import styles from './Auth.module.css';
import auth from '../common/Auth';
import queryString from 'query-string'

export default (props) => {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const [isConfirmed, setConfirmed] = useState(false);

    useEffect(() => {
        if (isConfirmed) {
            props.history.push('/profile');
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!confirmCode) {
            setError("Please enter confirm code.");
            return;
        }
        setLoading(true);
        const queryParams = queryString.parse(props.location.search);
        const params = {
            email: queryParams.email,
            confirmCode: confirmCode
        };
        auth.confirmSignup(params)
            .then((res) => {
                console.log('Account confirmed.');
                setConfirmed(true);
            })
            .catch((err) => {
                console.log('Cant verify account.' + err);
                switch (err.code) {
                    case "CodeMismatchException":
                        setError("Code mismatch");
                        break;
                    default:
                        setError('Unkown error.');
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <main className={styles.authForm}>
            <h1>Email confirmation</h1>
            <p>{error}</p>
            <div className={styles.formModal}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className={styles.inputLabel}>
                            Code from email:
                            <input type="text"
                                   name="code"
                                   maxLength="255"
                                   className={styles.inputText}
                                   required={true}
                                   value={confirmCode}
                                   onChange={(e) => setConfirmCode(e.target.value)}
                            />
                        </label>
                    </div>
                    <Button
                        disabled={isLoading}
                        content="Confirm account"
                        wide="true"
                    />
                    <div>No code? Send a new one.</div>
                </form>
            </div>
            <p className={styles.afterwords}>
                Don’t have an account? <Link to="/auth/signup">Sign up.</Link>
            </p>
        </main>
    );
}