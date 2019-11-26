import React from 'react';
import styles from './GoogleButton.module.css';

export default ({text, onClick}) => {

    return (
        <button type="button" className={styles.googleSignin} onClick={onClick}>
            <img src={require("./assets/google-logo.svg")} alt="google icon" width="18px" height="18px"/>
            <span>{text}</span>
        </button>
    );
}