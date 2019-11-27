import React, {useState} from 'react';
import styles from "./Auth.module.css";
import Button from "../common/button/Button";
import {Link} from "react-router-dom";
import {useAuth} from "../common/AuthProvider";
import {useFormik} from "formik";
import * as Yup from "yup";
import Input from "../common/input/Input";

const validationSchema = Yup.object({
    code: Yup.string()
        .required(),
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

    function handleSubmit(values) {
        setLoading(true);
        const body = {code: props.match.params.code, password: values.password};
        auth.resetPassword(body)
            .then(() => {
                setSuccess("Success! You can now log in.");
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