import React from 'react';
import styles from "./Button.module.css";

export default ({wide, disabled, content}) => {
    console.log(disabled);
    return (
        <button
            className={wide ? styles.wide : ''}
            disabled={disabled}>
            {content}
        </button>
    );
}