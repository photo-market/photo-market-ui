import React from 'react';
import styles from "./Checkbox.module.css";

export default ({formik, fieldName, content}) => {
    return (
        <label className={styles.labelCheckbox}>
            <input
                type="checkbox"
                {...formik.getFieldProps(fieldName)}
            />
            <span className={styles.checkmark}/>
            {content}
        </label>
    );
}