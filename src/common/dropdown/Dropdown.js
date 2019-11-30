import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styles from "./Dropdown.module.css";

export default ({title, items}) => {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={styles.dropdown}>
            <button onClick={setShowMenu(!showMenu)}>
                {title}
                <FontAwesomeIcon icon="coffee"/>
            </button>

            <ul className={styles.menu + (showMenu ? styles.open : '')}>
                {items.map(item =>
                    <li key={item.to}>
                        <Link to={item.to}>{item.content}</Link>
                    </li>
                )}
            </ul>
        </div>
    );
}