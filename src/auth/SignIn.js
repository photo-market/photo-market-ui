import React, {useState, useEffect} from 'react';
import styles from './Auth.module.css';
import Button from "../common/button/Button";
import {Link} from "react-router-dom";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import Checkbox from "../common/checkbox/Checkbox";
import SeparatingLine from "../common/line/SeparatingLine";
import * as Yup from "yup";
import {useFormik} from "formik";
import Input from "../common/input/Input";
import {useAuth} from "../common/AuthProvider";
import schemas from '../common/validationSchemas';


const validationSchema = Yup.object({
    email: schemas.email,
    password: schemas.password
});

const initialValues = {
    email: '',
    password: '',
    rememberMe: false
};

export default (props) => {

    const auth = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmationNeeded, setConfirmationNeeded] = useState(false);
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
        if (auth.isAuthenticated) {
            props.history.push('/');
        }
    });

    function onSubmit(values) {
        setLoading(true);
        const params = {
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe
        };
        auth.signIn(params)
            .then((res) => {
                console.log('Successfully logged-in.');
            })
            .catch((err) => {
                console.log('Something happened during login.' + JSON.stringify(err));
                switch (err && err.code) {
                    case 'NotAuthorizedException':
                        setError(<div>Incorrect email/password. <Link to="/auth/forgot">Forgot password?</Link></div>);
                        break;
                    case 'UserNotFoundException':
                        setError('Such email is not found.');
                        break;
                    case 'UserNotConfirmedException':
                        setConfirmationNeeded(true);
                        break;
                    case 'PasswordResetRequiredException':
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

            <div className={styles.formModal}>
                <div className={styles.error}>{error}</div>
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
                <GoogleButton text="Login using Google" onClick={() => auth.socialSignIn('Google')}/>
                <FacebookButton text="Login using Facebook" onClick={() => auth.socialSignIn('Facebook')}/>
            </div>
            <p className={styles.afterwords}>
                Don’t have an account? <Link to="/auth/signup">Sign up.</Link>
            </p>
        </main>
    );
}