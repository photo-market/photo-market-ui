import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styles from './Header.module.css';
import MenuDropdown from "./MenuDropdown";
import {useAuth} from "../common/AuthProvider";

export default (props) => {

    const auth = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const profileName = auth.user && auth.user.profile ? auth.user.profile.firstName : '';

    function toggleMobileMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <div>
            <header className={styles.headerDesktop}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img height="17px" width="197px" src={require("../app/logo.png")} alt="Logo"/>
                    </Link>
                </div>

                {auth.isAuthenticated ?
                    <MenuDropdown
                        title={profileName}
                        items={[
                            {to: "/chat", content: `Messages`},
                            {to: "/account", content: `Settings`},
                            {to: "/auth/sign-out", content: `Log out`},
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
                        <img src={require(menuOpen ? './up-arrow.svg' : './down-arrow.svg')}
                             style={{marginLeft: '10px', height: '13px', width: '13px'}}
                             alt=""
                        />
                    </button>
                </div>
                <nav className={styles.headerMobileLinks}
                     style={{transform: menuOpen ? "translateY(60px)" : "translateY(-100%)"}}>

                    {auth.isAuthenticated ?
                        <div>Hi {profileName}</div>
                        :
                        <ul onClick={toggleMobileMenu}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/auth/login">Join as a photographer</Link></li>
                            <li><Link to="/auth/signup">Sign up</Link></li>
                            <li><Link to="/auth/login">Log in</Link></li>
                        </ul>
                    }
                </nav>
            </header>
        </div>
    );
}