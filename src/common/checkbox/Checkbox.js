import React from 'react';
import "./Checkbox.css";

export default (props) => {
    return (
        <label className="label-checkbox">
            <input type="checkbox"/>
            <span className="checkmark"/>
            {props.content}
        </label>
    );
}