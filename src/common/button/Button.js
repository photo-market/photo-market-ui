import React from 'react';
import styles from "./Button.module.css";

export default ({type, wide, disabled, onClick, inline, children}) => {
    return (
        <button
            type={type}
            className={wide ? styles.wide : ''}
            style={inline ? {background: 'none', color: 'black'} : null}
            onClick={onClick}
            disabled={disabled}>
            {children}
        </button>
    );
}