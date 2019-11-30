import React from 'react';
import Dots from "../dots/Dots";
import styles from "./Button.module.css";

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