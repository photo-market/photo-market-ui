import React from 'react';
import {useState, useEffect} from 'react';
import styles from './Home.module.css';
import Select from "../common/select/Select";
import {Link} from "react-router-dom";

const URL = process.env.REACT_APP_API_URL;

const events = [
    {name: 'Wedding', key: 'wedding'},
    {name: 'Portrait', key: 'portrait'},
    {name: 'Headshot', key: 'headshot'},
    {name: 'Event', key: 'event'},
    {name: 'Boudoir', key: 'boudoir'},
];

export default (props) => {

    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        fetch(`${URL}/portfolios`)
            .then(res => res.json())
            .then(data => {
                setPortfolios(data);
            });
    }, []);

    const submit = (event) => {
        event.preventDefault();
        console.log('search');
    };

    return (
        <div>
            <section className={styles.callToAction}>
                <div className={styles.callToActionModal}>
                    <h1 className={styles.callToActionTitle}>
                        Photo Market
                    </h1>
                    <div className={styles.callToActionDescription}>
                        Right place to find a photographer. <br/>
                        Just choose a topic we'll show you the right people.
                    </div>
                    <form method="get" onSubmit={submit}>
                        <div className={styles.callToActionSelect}>
                            <Select placeholder="What's your event?"
                                    options={events}
                                    onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className="search">Search</button>
                        </div>
                    </form>
                </div>
            </section>

            <section className={styles.popularProfiles}>
                <h1>Top portfolios</h1>
                <div className={styles.portfoliosSection}>
                    {portfolios.map(profile =>
                        <div className={styles.portfolioCard} key={profile._id}>
                            <Link to={`/portfolio/${profile._id}`}>
                                <img src={"https://via.placeholder.com/300x150"} alt=""/>
                            </Link>
                            <h1>
                                <Link to={`/portfolio/${profile._id}`}>
                                    {profile.profile.firstName}, {profile.profile.lastName}
                                </Link>
                            </h1>
                            <p>{'Wedding, headshot'}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}