import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styles from "./MenuDropdown.module.css";

export default ({title, items}) => {

    const [showMenu, setShowMenu] = useState(false);

    function toggle() {
        setShowMenu(!showMenu);
    }

    return (
        <nav className={styles.dropdown}>
            <div onClick={toggle}
                 className={styles.title}>
                <img src={require("./avatar.png")} alt="Avatar" width="20" height="20"/>
                <div>{title}</div>
                <FontAwesomeIcon icon="chevron-down"/>
            </div>

            <div className={styles.menu + ' ' + (showMenu ? styles.show : '')}>
                {items.map(item =>
                    <div key={item.to} className={styles.menuItem}>
                        <Link to={item.to} onClick={toggle}>{item.content}</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}