import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import * as Yup from 'yup';
import Button from "../common/button/Button";
import SeparatingLine from "../common/line/SeparatingLine";
import GoogleButton from "./GoogleButton";
import FacebookButton from "./FacebookButton";
import auth from '../common/Auth';
import styles from "./Auth.module.css";
import {useFormik} from "formik";

const validationSchema = Yup.object({
    firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Minimum password length is 6 characters.')
        .max(50, 'Maximum password length is 50 characters.')
        .required('Required')
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

const Input = ({formik, type, fieldName, disabled, label, autoComplete}) => {
    let style = styles.inputText;
    style += ' ' + (formik.touched[fieldName] && formik.errors[fieldName] ? styles.inputError : ' ');
    return (
        <>
            {formik.touched[fieldName] && formik.errors[fieldName] &&
            <div>{formik.errors[fieldName]}</div>
            }
            <label className={styles.inputLabel} htmlFor="firstName">
                {label}
            </label>
            <input id={fieldName}
                   name={fieldName}
                   type={type}
                   className={style}
                   disabled={disabled}
                   autoComplete={autoComplete}
                   {...formik.getFieldProps(fieldName)}
            />
        </>
    )
};

export default (props) => {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [confirmationNeeded, setConfirmationNeeded] = useState(false);
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (confirmationNeeded) {
            props.history.push(`/auth/confirm?email=${formik.values.email}`);
        }
    });

    function handleSubmit(values) {
        setLoading(true);
        const user = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName
        };
        auth.register(user)
            .then((res) => {
                console.log('SignUp: Successfully signed-up.');
                setConfirmationNeeded(true);
            })
            .catch((err) => {
                console.log('SignUp: Something happened during registration.' + JSON.stringify(err));
                switch (err) {
                    case 'UsernameExistsException':
                        setError(
                            <p>Such email is already registered. &nbsp;
                                <Link to="/auth/forgot">Forgot your password?</Link></p>
                        );
                        break;
                    case 'InvalidParameterException':
                        setError('Check your parameters.');
                        break;
                    case 'InvalidPasswordException':
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
                <div className={styles.error}>{error}</div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.twoColumns}>
                        <div>
                            <Input
                                formik={formik}
                                fieldName='firstName'
                                type="text"
                                label="First Name"
                                autoComplete="given-name"
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <Input
                                formik={formik}
                                type="text"
                                fieldName='lastName'
                                label="Last Name"
                                autoComplete="family-name"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div>
                        <Input
                            formik={formik}
                            type="email"
                            fieldName='email'
                            label="Email address"
                            autoComplete="email"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <Input
                            formik={formik}
                            type="password"
                            fieldName='password'
                            label="Password"
                            autoComplete="new-password"
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
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
