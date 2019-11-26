import React from 'react';
import styles from './FacebookButton.module.css';

export default ({text}) => {

    return (
        <button type="button" className={styles.fbSignin}>
            <img src={require("./assets/icon-facebook-white.svg")} alt="facebook icon" width="18px" height="18px"/>
            <span>{text}</span>
        </button>
    );
}