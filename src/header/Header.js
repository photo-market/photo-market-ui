import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styles from './Header.module.css';
import authService from "../common/Auth";
import MenuDropdown from "./MenuDropdown";

export default () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const currentUser = authService.getCurrentUser();

    function toggleMobileMenu() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <div>
            <header className={styles.headerDesktop}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img height="17px" width="197px" src={require("../app/logo.png")} alt="Logo"/>
                    </Link>
                </div>

                {authService.isAuthenticated() ?
                    // Notifications icon
                    <MenuDropdown
                        title={currentUser['given_name']}
                        items={[
                            {to: "/account", content: `Account`},
                            {to: "/logout", content: `Log out`},
                        ]}/>
                    :
                    <nav className={styles.siteNav}>
                        <Link to="/auth/signup">Join as a photographer</Link>
                        <Link to="/auth/signup">Sign up</Link>
                        <Link to="/auth/login">Login</Link>
                    </nav>
                }
            </header>

            <header className={styles.headerMobile}>
                <div className={styles.logo}>
                    <button onClick={toggleMobileMenu}>
                        <img height="17px" width="197px" src={require("../app/logo.png")} alt="Logo"/>
                        <img src={require(isMobileMenuOpen ? './up-arrow.svg' : './down-arrow.svg')}
                             style={{marginLeft: '10px', height: '13px', width: '13px'}}
                             alt=""
                        />
                    </button>
                </div>
                <nav className={styles.headerMobileLinks}
                     style={{transform: isMobileMenuOpen ? "translateY(60px)" : "translateY(-100%)"}}>

                    {authService.isAuthenticated() ?
                        <ul onClick={toggleMobileMenu}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/auth/login">Join as a photographer</Link></li>
                            <li><Link to="/auth/signup">Sign up</Link></li>
                            <li><Link to="/auth/login">Log in</Link></li>
                        </ul>
                        :
                        <div>Hi {currentUser['given_name']}</div>
                    }


                </nav>
            </header>
        </div>
    );
}