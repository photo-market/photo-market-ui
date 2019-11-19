import React from 'react';
import styles from "./Button.module.css";

export default ({wide, disabled, content}) => {
    return (
        <button
            className={wide ? styles.wide : ''}
            disabled={disabled}>
            {content}
        </button>
    );
}