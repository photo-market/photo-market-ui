import React from 'react';
import styles from "./Select.module.css";

export default ({placeholder, options, onChange}) => {
    return (
        <label>
            <select onChange={onChange} className={styles.select}>
                <option value="">{placeholder}</option>
                {options.map(event =>
                    <option key={event.key} value={event.key}>{event.name}</option>
                )}
            </select>
        </label>
    );
}