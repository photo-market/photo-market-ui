import styles from "../../auth/Auth.module.css";
import React from "react";

const Input = ({formik, type, fieldName, disabled, label, autoComplete}) => {
    let style = styles.inputText;
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
        style += ` ${styles.inputError} `;
    }
    return (
        <>
            {formik.touched[fieldName] && formik.errors[fieldName] &&
            <div>{formik.errors[fieldName]}</div>
            }
            <label className={styles.inputLabel} htmlFor={fieldName}>
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

export default Input;