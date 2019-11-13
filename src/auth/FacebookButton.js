import React from 'react';
import styles from './FacebookButton.module.css';

export default () => {

    return (
        <button className={styles.fbSignin}>
            <img src={require("./social/icon-facebook-white.svg")} alt="google icon" width="18px" height="18px"/>
            <span>Log In with Facebook</span>
        </button>
    );
}