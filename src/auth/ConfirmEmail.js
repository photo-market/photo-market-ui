import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import Button from "../common/button/Button";
import styles from './Auth.module.css';
import authService from '../common/Auth';
import queryString from 'query-string'

export default (props) => {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const [isConfirmed, setConfirmed] = useState(false);
    const [lastResend, setLastResend] = useResendCodeHandler();

    useEffect(() => {
        let timeout;
        if (isConfirmed) {
            timeout = setTimeout(() => props.history.push('/'), 3000);
        }
        return () => clearTimeout(timeout);
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
            code: confirmCode
        };
        authService.confirmSignup(params)
            .then(() => {
                console.log('Account confirmed.');
                setError("Success! Redirecting you to a home page...");
                setConfirmed(true);
            })
            .catch((err) => {
                console.log('Cant verify account.' + err);
                switch (err.code) {
                    case "CodeMismatchException":
                        setError("Code mismatch");
                        break;
                    case "ExpiredCodeException":
                        setError("Code expired.");
                        break;
                    default:
                        setError('Unkown error.');
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    function handleSendNewCode() {
        console.log('Sending new code...');
        setLoading(true);
        if (!canResend()) {
            console.log("Wait before asking new code.");
            return;
        }
        const queryParams = queryString.parse(props.location.search);
        authService.resetConfirmationCode(queryParams.email)
            .then((result) => {
                console.log('New code sent.');
                setLastResend(new Date());
            })
            .catch((error) => {
                console.log(`Error sending new code.`);
                switch (error.code) {
                    case 'LimitExceededException':
                        setError(`Too many attempts. Please wait an retry later.`);
                        break;
                    default:
                        setError('Sorry, please try again later.');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function canResend() {
        if (!lastResend) {
            return true;
        }
        const diffTime = Math.abs(new Date() - lastResend);
        const TIMEOUT_SECONDS = 360;
        return diffTime / 1000 >= TIMEOUT_SECONDS;
    }

    return (
        <main className={styles.authForm}>
            <h1>Email confirmation</h1>
            <div className={styles.formModal}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.error}>{error}</div>
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
                        wide="true">
                        Confirm account
                    </Button>

                    {canResend() ?
                        <div>
                            No code?
                            <Button type="button"
                                    inline={true}
                                    onClick={handleSendNewCode}>
                                Send a new one.
                            </Button>
                        </div>
                        :
                        <div>
                            New code send. Wait a bit before asking for a new one.
                        </div>
                    }
                </form>
            </div>
            <p className={styles.afterwords}>
                Don’t have an account? <Link to="/auth/signup">Sign up.</Link>
            </p>
        </main>
    );
}

// function useCountdownTimer(initialValue) {
//     const [value, setValue] = useState(initialValue);
//     const ONE_SECOND = 1000;
//
//     useEffect(() => {
//         console.log('useEffect - setInterval');
//         let interval;
//         if (value > 0) {
//             interval = setInterval(() => {
//                 if (value > 0) {
//                     setValue(value - 1);
//                 }
//             }, ONE_SECOND);
//         }
//         return () => {
//             clearInterval(interval);
//         }
//     });
//
//     return value;
// }

// https://usehooks.com/useLocalStorage/
function useResendCodeHandler() {
    const [lastResendDate, setLastResetDate] = useState(() => {
        const itemStr = window.localStorage.getItem('lastResendDate');
        if (itemStr) {
            return new Date(itemStr);
        }
        return null;
    });

    const timeoutRef = useRef(null);
    useEffect(() => {
        if (lastResendDate) {
            const diffTimeMs = Math.abs(new Date() - lastResendDate);
            const remainingTimeMs = 10 * 1000 - diffTimeMs;
            if (remainingTimeMs > 0) {
                timeoutRef.current = setTimeout(() => {
                    setLastResetDate(null);
                    window.localStorage.removeItem('lastResendDate');
                }, remainingTimeMs);
            } else {
                setLastResetDate(null);
                window.localStorage.removeItem('lastResendDate');
            }
        }
        return () => {
            clearTimeout(timeoutRef.current);
        }
    }, [lastResendDate, setLastResetDate]);

    const setValue = (newVal) => {
        if (newVal) {
            window.localStorage.setItem('lastResendDate', newVal.toJSON());
            setLastResetDate(newVal);
        }
    };

    return [lastResendDate, setValue];
}