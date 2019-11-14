import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Button from "../common/button/Button";
import styles from './Auth.module.css';
import auth from '../common/Auth';

export default (props) => {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            props.history.push('/auth/confirm');
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!confirmCode) {
            setError("You need to specify email and password!");
            return;
        }
        setLoading(true);
        auth.confirm(confirmCode)
            .then((res) => {
                console.log('then: ok');
                setSuccess(true);
            })
            .catch((err) => {
                console.log('catch: error happened');
                switch (err) {
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