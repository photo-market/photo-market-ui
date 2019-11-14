import React from 'react';
import styles from "./Checkbox.module.css";

export default (props) => {
    return (
        <label className={styles.labelCheckbox}>
            <input type="checkbox"/>
            <span className={styles.checkmark}/>
            {props.content}
        </label>
    );
}