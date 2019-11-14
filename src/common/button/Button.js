import React from 'react';
import styles from "./Button.module.css";

export default (props) => {
    return (
        <button className={props.wide ? styles.wide : ''}>
            {props.content}
        </button>
    );
}