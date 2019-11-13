import React from 'react';
import styles from './GoogleButton.module.css';

export default () => {

    return (
        <button className={styles.googleSignin}>
            <img src={require("./social/google-logo.svg")} alt="google icon" width="18px" height="18px"/>
            <span>Log In with Google</span>
        </button>
    );
}