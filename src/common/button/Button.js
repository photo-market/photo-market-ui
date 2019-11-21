import React from 'react';
import styles from "./Button.module.css";
import Dots from "../dots/Dots";

export default ({type, wide, disabled, onClick, inline, loading, children}) => {
    let generatedClass = wide ? styles.wide : ' ';
    generatedClass += inline ? styles.inline :  ' ';

    return (
        <button
            type={type}
            className={generatedClass}
            onClick={onClick}
            disabled={disabled}>
            {loading ? <Dots/> : children}
        </button>
    );
}