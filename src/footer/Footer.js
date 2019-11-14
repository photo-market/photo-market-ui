import React from 'react';
import styles from './Footer.module.css';
import {Link} from "react-router-dom";

export default () => {
    return (
        <footer>
            <ul className={styles.ul}>
                <li>
                    <Link to="/about-us">About us</Link>
                </li>
                <li>
                    <Link to="/contact-us">Contact us</Link>
                </li>
                <li>
                    <Link to="/sitemap">Sitemap</Link>
                </li>
                <li>
                    <Link to="/terms-of-use">Terms of Use</Link>
                </li>
                <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
            </ul>
            <div>&copy; 2019 Photo Market, Inc.</div>
        </footer>
    )
}