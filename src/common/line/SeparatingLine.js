import React from 'react';
import './SeparatingLine.css';

export default (props) => {
    return (
        <div className="separating-line">
            {props.content}
        </div>
    );
}