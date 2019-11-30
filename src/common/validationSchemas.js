import * as Yup from "yup";

export default {
    firstName: Yup.string()
        .max(20, 'Must be 20 characters or less')
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

};