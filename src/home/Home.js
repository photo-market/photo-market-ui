import React from 'react';
import {useEffect} from 'react';
import styles from './Home.module.css';
import Select from "../common/select/Select";

const URL = process.env.REACT_APP_API_URL;

const profiles = [
    {
        id: '1',
        link: '/profile',
        cover: 'https://via.placeholder.com/300x150',
        name: 'Steven Crisman',
        tags: 'Wedding, headshot',
    },
    {
        id: '2',
        link: '/profile',
        cover: 'https://via.placeholder.com/300x150',
        name: 'Steven Crisman',
        tags: 'Wedding, headshot',
    }
];

const events = [
    {name: 'Wedding', key: 'wedding'},
    {name: 'Portrait', key: 'portrait'},
    {name: 'Headshot', key: 'headshot'},
    {name: 'Event', key: 'event'},
    {name: 'Boudoir', key: 'boudoir'},
];

export default (props) => {

    useEffect(() => {
        fetch(`${URL}/portfolios`)
            .then(res => res.json())
            .then(data => {

            });
    });

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
                    {profiles.map(profile =>
                        <div className={styles.portfolioCard} key={profile.id}>
                            <a href={profile.link}>
                                <img src={profile.cover} alt=""/>
                            </a>
                            <h1><a href={profile.link}>{profile.name}</a></h1>
                            <p>{profile.tags}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}