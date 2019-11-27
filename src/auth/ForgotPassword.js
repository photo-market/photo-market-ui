import React, {useState} from 'react';
import styles from "./Auth.module.css";
import Button from "../common/button/Button";
import {Link} from "react-router-dom";
import {useAuth} from "../common/AuthProvider";
import {useFormik} from "formik";
import * as Yup from "yup";
import Input from "../common/input/Input";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required')
});

const initialValues = {
    email: ''
};

export default () => {

    const auth = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    });

    function handleSubmit(values) {
        setLoading(true);
        auth.sendPasswordResetEmail(values.email)
            .then(() => {
                setSuccess("Success! Please, check your email to find out how to reset your password.");
            })
            .catch((err) => {
                setError(err.msg);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <main className={styles.authForm}>
            <h1>Email confirmation</h1>
            <div className={styles.formModal}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.success}>{success}</div>
                    <div className={styles.error}>{error}</div>
                    <Input
                        formik={formik}
                        fieldName='email'
                        type="text"
                        label="Your email"
                        autoComplete="email"
                        disabled={isLoading || success}
                    />
                    <Button
                        type="submit"
                        disabled={isLoading || success}
                        wide="true"
                        loading={isLoading}>
                        Send reset email
                    </Button>
                </form>
            </div>
            <p className={styles.afterwords}>
                Want to sign-in? <Link to="/auth/login">Sign in.</Link>
            </p>
        </main>
    );
}