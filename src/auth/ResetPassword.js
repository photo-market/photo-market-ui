import React, {useState} from 'react';
import styles from "./Auth.module.css";
import Button from "../common/button/Button";
import {Link} from "react-router-dom";
import {useAuth} from "../common/AuthProvider";
import {useFormik} from "formik";
import * as Yup from "yup";
import Input from "../common/input/Input";

const validationSchema = Yup.object({
    password: Yup.string()
        .required('Required')
});

const initialValues = {
    password: '',
};

export default (props) => {

    const auth = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    });

    async function handleSubmit(values, params) {
        console.log(JSON.stringify(values, null, 2));
        console.log(JSON.stringify(params, null, 2));
        setLoading(true);
        const body = {
            token: props.match.params.token,
            password: values.password
        };
        try {
            await auth.resetPassword(body);
            setSuccess(<div>Success! You can now <Link to="/auth/login">log in</Link>.</div>);
        } catch (err) {
            switch (err && err.code) {
                case 'CodeExpiredException':
                    setError("Your code is invalid or expired.");
                    break;
                default:
                    setError("Sorry, something went wrong.");
            }
        }
        setLoading(false);
    }

    return (
        <main className={styles.authForm}>
            <h1>Password reset</h1>
            <div className={styles.formModal}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.success}>{success}</div>
                    <div className={styles.error}>{error}</div>
                    <Input
                        formik={formik}
                        fieldName='password'
                        type="password"
                        label="New password"
                        autoComplete="new-password"
                        disabled={isLoading || success}
                    />
                    <Button
                        type="submit"
                        disabled={isLoading || success}
                        wide="true"
                        loading={isLoading}>
                        Change password
                    </Button>
                </form>
            </div>
            <p className={styles.afterwords}>
                Want to sign-in? <Link to="/auth/login">Sign in.</Link>
            </p>
        </main>
    );
}