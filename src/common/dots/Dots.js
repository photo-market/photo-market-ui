import React from 'react';
import styles from "./Dots.module.css";

export default () => {
    return (
        <div className={styles.spinner}>
            <div className={styles.bounce1}/>
            <div className={styles.bounce2}/>
            <div/>
        </div>
    );
}