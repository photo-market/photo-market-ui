import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import Checkbox from "../common/checkbox/Checkbox";
import SeparatingLine from "../common/line/SeparatingLine";
import Button from "../common/button/Button";
import authService from '../common/Auth';
import styles from './Auth.module.css';
import * as Yup from "yup";
import {useFormik} from "formik";
import Input from "../common/input/Input";
import {Auth} from 'aws-amplify';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Minimum password length is 6 characters.')
        .max(50, 'Maximum password length is 50 characters.')
        .required('Required')
});

const initialValues = {
    email: '',
    password: '',
    rememberMe: false
};

export default (props) => {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmationNeeded, setConfirmationNeeded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated);
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    useEffect(() => {
        if (confirmationNeeded) {
            props.history.push(`/auth/confirm?email=${formik.values.email}`);
        }
    });

    useEffect(() => {
        if (isLoggedIn) {
            props.history.push('/');
        }
    });

    function onSubmit(values) {
        console.log("SignUp: handleSubmit");
        console.log(JSON.stringify(values, null, 2));

        setLoading(true);
        const params = {
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe
        };
        console.log(JSON.stringify(params, null, 2));

        authService.signIn(params)
            .then((res) => {
                console.log('Successfully logged-in.');
                setIsLoggedIn(true);
                debugger;
            })
            .catch((err) => {
                console.log('Something happened during login.' + JSON.stringify(err));
                debugger;
                switch (err.code) {
                    case 'NotAuthorizedException':
                        // The error happens when the incorrect password is provided
                        setError('Incorrect email of password.');
                        break;
                    case 'UserNotFoundException':
                        // The error happens when the supplied username/email does not exist in the Cognito user pool
                        setError('Such email is not found.');
                        break;
                    case 'UserNotConfirmedException':
                        setConfirmationNeeded(true);
                        break;
                    case 'PasswordResetRequiredException':
                        // The error happens when the password is reset in the Cognito console
                        // In this case you need to call forgotPassword to reset the password
                        break;
                    default:
                        setError('Unknown error.');
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <main className={styles.authForm}>
            <h1>Welcome back!</h1>

            <button onClick={() => {
                authService.getCurrentUser().then((res) => setError(JSON.stringify(res, null, 2)));
            }}>LOAD
            </button>

            <button onClick={() => {
                authService.updateProfile().then((res) => setError(JSON.stringify(res, null, 2)));
            }}>Update
            </button>

            <button onClick={() => {
                authService.forgotPassword('saniaky@gmail.com').then((res) => setError(JSON.stringify(res, null, 2)));
            }}>Forgot password
            </button>

            <div className={styles.formModal}>
                <p className={styles.error}>{error}</p>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <Input
                            formik={formik}
                            type="email"
                            disabled={isLoading}
                            autoComplete="email"
                            fieldName="email"
                            label="Email address"
                        />
                    </div>
                    <div>
                        <Input
                            formik={formik}
                            disabled={isLoading}
                            type="password"
                            autoComplete="password"
                            fieldName="password"
                            label="Password"
                        />
                    </div>
                    <div className={styles.rememberMe}>
                        <Checkbox
                            formik={formik}
                            content="Remember me"
                            fieldName='rememberMe'
                            disabled={isLoading}
                        />
                        <Link to="/auth/forgot">Forgot password?</Link>
                    </div>
                    <Button
                        type="submit"
                        wide={true}
                        disabled={isLoading}
                        loading={isLoading}
                    >Log In</Button>
                </form>
                <SeparatingLine content="OR"/>
                <GoogleButton text="Login using Google" onClick={() => authService.socialSignIn('Google')}/>
                <FacebookButton text="Login using Facebook" onClick={() => authService.socialSignIn('Facebook')}/>
            </div>
            <p className={styles.afterwords}>
                Don’t have an account? <Link to="/auth/signup">Sign up.</Link>
            </p>
        </main>
    );
}