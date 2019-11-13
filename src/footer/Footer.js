import React from 'react';
import styles from './Footer.module.css';

export default () => {
    return (
        <footer>
            <ul className={styles.ul}>
                <li><a href="/about-us">About us</a></li>
                <li><a href="/about-us">Contact us</a></li>
                <li><a href="/sitemap">Site map</a></li>
                <li><a href="/legal">Terms & Conditions</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
            <div>&copy; 2019 Photo Market, Inc.</div>
        </footer>
    )
}