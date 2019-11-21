import React from 'react';
import styles from "./Button.module.css";
import Dots from "../dots/Dots";

export default ({type, wide, disabled, onClick, inline, loading, children}) => {
    return (
        <button
            type={type}
            className={wide ? styles.wide : ' '}
            style={inline ? {background: 'none', color: 'black'} : null}
            onClick={onClick}
            disabled={disabled}>
            {loading ? <Dots/> : children}
        </button>
    );
}