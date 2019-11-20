import React, {useState, useEffect} from 'react';
import styles from './Profile.module.css';
import Button from "../common/button/Button";
import authService from "../common/Auth";

export default () => {

    const error = useState('');
    const profile = authService.getCurrentUser();

    useEffect(() => {

    });

    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <section className={styles.left}>
                    <div>
                        <div className={styles.avatar}>
                            <div>
                                <img src={require("../assets/avatar.png")}
                                     alt="avatar"
                                     width="125px" height="125px"/>
                            </div>
                            <div style={{paddingTop: '8px'}}>
                                <Button>Upload Photo</Button>
                            </div>
                        </div>
                        <div className={styles.name}>
                            {profile.given_name} {profile.family_name}
                        </div>
                        <div className={styles.email}>
                            {profile.email}
                        </div>
                    </div>
                </section>
                <div className={styles.right}>
                    <section>
                        <h4>Account</h4>
                        <p>{error}</p>
                        <form>
                            <div>
                                <label>
                                    First Name
                                    <input type="text" value={""}/>
                                </label>
                                <label>
                                    Last Name
                                    <input type="text"/>
                                </label>
                            </div>
                            <Button>Save</Button>
                        </form>
                    </section>
                    <section>
                        <h4>Notifications</h4>
                        ToDo
                    </section>
                    <section>
                        <h4>Service area</h4>
                        <Button>Delete account</Button>
                    </section>
                </div>
            </div>
        </div>
    );
}