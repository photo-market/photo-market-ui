import React from 'react';
import styles from './GoogleButton.module.css';

export default ({text}) => {

    return (
        <button className={styles.googleSignin}>
            <img src={require("./assets/google-logo.svg")} alt="google icon" width="18px" height="18px"/>
            <span>{text}</span>
        </button>
    );
}