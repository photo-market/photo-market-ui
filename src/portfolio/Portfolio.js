import React, {useState, useEffect} from 'react';
import styles from './Portfolio.module.css';
import commonStyles from '../common/Common.module.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComments, faMapMarkerAlt, faStar} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebookSquare, faFlickr,
    faInstagram,
    faLinkedin, faPinterestSquare,
    faTwitterSquare,
    faVimeo,
    faYoutubeSquare
} from "@fortawesome/free-brands-svg-icons";

export default (props) => {

    const [profile, setProfile] = useState({});
    //const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/portfolios/${props.match.params.userId}`)
            .then(res => res.data)
            .then(data => {
                setProfile(data);
            })
            .catch((e) => {

            })
            .finally(() => {
                //setLoading(false);
            });
    }, [props.match.params.userId]);

    return (
        <main className={styles.profileContainer}>

            <div className={styles.breadcrumbs}>
                <button onClick={() => props.history.goBack()}>Back</button>
            </div>

            <section className={styles.headline}>
                <div className={styles.profileDetails}>
                    <img alt="Avatar" src={require("./avatar.jpg")}/>
                    <div className={styles.profileInfo}>
                        <h1>{`${profile.lastName}, ${profile.firstName}`}</h1>
                        <div>
                            <div>
                                <span className={styles.onlineStatus}>
                                    <span className={styles.dot}/> Online
                                    {/*<span className={styles.dot}/> Offline*/}
                                </span>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                <Link to="location">Chicago, IL</Link>
                            </div>
                            <div className={styles.rating}>
                                5.0
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                                <FontAwesomeIcon icon={faStar}/>
                            </div>
                            <div>
                                <div>Specialization:</div>
                                <ul className={commonStyles.commaSeparated}>
                                    <li>Event</li>
                                    <li>Engagement</li>
                                    <li>Wedding</li>
                                    <li>Children</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <Link to="/chat">
                        <button>
                            <FontAwesomeIcon icon={faComments}/> Write a message
                        </button>
                    </Link>
                </div>
            </section>

            <section className={styles.additionalInfo}>
                <div className={styles.biography}>
                    <span>About me</span>
                    <p>
                        I specialize in event photography and engagement photography,
                        particularly surprise engagements. Nothing pleases me more than an ecstatic
                        customer who can't believe I captured the shot. My customers will tell you
                        that when I'm on the job, I'm everywhere. I do my best to capture every moment,
                        whether I'm doing a family event on Lake Michigan, a corporate shoot at the
                        Union League Club, or an engagement session in Lincoln Park. I shoot with
                        the Nikon D850 and the Nikon D750. I always have two cameras on me on
                        every shoot so I can quickly go from an intimate shot to a wider portrait.
                    </p>
                </div>

                <div className={styles.contactInfo}>
                    <div>
                        <span>Contact info:</span>
                        <button>Request Photographer</button>
                        <ul className={commonStyles.noStyleList}>
                            <li>812-123-3514</li>
                            <li>812-121-3531</li>
                            <li><a href="/">http://karolina-thompson.com</a></li>
                        </ul>
                    </div>
                    <div className={styles.businessHours}>
                        <span>Business hours: </span>
                        <br/>
                        <span>Daily 7:00 a.m. to midnight (CDT)</span>
                    </div>
                    <div>
                        <span>Social media</span>
                        <ul className={styles.socialNetworksList}>
                            <li><Link target="_blank" to="https://instagram.com"><FontAwesomeIcon
                                icon={faInstagram}/></Link></li>
                            <li><Link target="_blank" to=""><FontAwesomeIcon icon={faLinkedin}/></Link></li>
                            <li><Link target="_blank" to=""><FontAwesomeIcon icon={faFacebookSquare}/></Link></li>
                            <li><Link target="_blank" to=""><FontAwesomeIcon icon={faTwitterSquare}/></Link></li>
                            <li><Link target="_blank" to=""><FontAwesomeIcon icon={faVimeo}/></Link></li>
                            <li><Link target="_blank" to=""><FontAwesomeIcon icon={faYoutubeSquare}/></Link></li>
                            <li><Link target="_blank" to=""><FontAwesomeIcon icon={faFlickr}/></Link></li>
                            <li><Link target="_blank" to=""><FontAwesomeIcon icon={faPinterestSquare}/></Link></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={styles.portfolio}>
                <h1>Portfolio</h1>
                <div>
                    <ul>lll</ul>
                </div>
            </section>
        </main>
    );
}