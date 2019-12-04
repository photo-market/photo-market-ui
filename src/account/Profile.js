import React, {useState, useEffect} from 'react';
import Button from "../common/button/Button";
import styles from './Profile.module.css';
import {useAuth} from "../common/AuthProvider";
import Input from "../common/input/Input";
import {useFormik} from "formik";
import schemas from '../common/validationSchemas';
import * as Yup from "yup";
import authStyles from '../auth/Auth.module.css';
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const validationSchema = Yup.object({
    firstName: schemas.firstName,
    lastName: schemas.lastName,
    password: schemas.password
});

export default () => {

    const auth = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [sessions, setSessions] = useState([]);
    const formik = useFormik({
        initialValues: {
            firstName: auth.user.profile.firstName,
            lastName: auth.user.profile.lastName,
        },
        validationSchema,
        onSubmit
    });

    function onSubmit(values) {
        setLoading(true);
        setError('');
        setSuccess('');
    }

    useEffect(() => {
        setSessions([]);
        axios.get(`${URL}/account`)
            .then(res => res.data)
            .then(data => {

            });
        // axios.get(`${URL}/auth/sessions`)
        //     .then(res => res.data)
        //     .then(data => setSessions(data))
        //     .catch((e) => console.log(e))
        //     .finally(() => console.log('sessions'));
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <section className={styles.left}>
                    <div>
                        <div className={styles.avatar}>
                            <div>
                                <img src={require("../assets/avatar.png")}
                                     alt="avatar"
                                     width="125px" height="125px"/>
                            </div>
                            <div style={{paddingTop: '8px'}}>
                                <Button>Upload Photo</Button>
                            </div>
                        </div>
                        <div className={styles.name}>
                            {auth.user.profile.firstName} {auth.user.profile.lastName}
                        </div>
                        <div className={styles.email}>
                            {auth.user.profile.email}
                        </div>
                    </div>
                </section>
                <div className={styles.right}>
                    <section>
                        <h4>Account</h4>
                        <div className={authStyles.success}>{success}</div>
                        <div className={authStyles.error}>{error}</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <div>
                                    <Input
                                        formik={formik}
                                        fieldName="firstName"
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
                                        fieldName="lastName"
                                        label="Last Name"
                                        autoComplete="family-name"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <Button type="submit" loading={isLoading}>Save</Button>
                        </form>
                    </section>
                    <section>
                        <h4>Sessions</h4>
                        {sessions.map(session =>
                            <div>

                            </div>
                        )}
                    </section>
                    <section>
                        <h4>Notifications</h4>
                        ToDo
                    </section>
                    <section>
                        <h4>Service area</h4>
                        <Button disabled={true}>Delete account</Button>
                    </section>
                </div>
            </div>
        </div>
    );
}