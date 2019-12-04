import React from 'react';
import styles from './Chat.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip, faPaperPlane} from "@fortawesome/free-solid-svg-icons";

// import {useState, useEffect} from 'react';

export default (props) => {
    return (
        <main className={styles.messaging}>
            <div className={styles.chat}>
                <div className={styles.leftBar}>
                    <div className={styles.search}>
                        <label>
                            <input type="search" placeholder="Search"/>
                        </label>
                    </div>

                    <div className={styles.dialogs}>
                        <ul>
                            <li className={styles.active}>
                                <img alt="Avatar"
                                     className={styles.smallAvatar}
                                     src={require('../assets/avatar.png')}
                                     width="50px" height="50px"/>
                                <div>
                                    <div className={styles.nameAndDate}>
                                        <div className={styles.name}>Steven Johnson</div>
                                        <div className={styles.lastMessageTime}>9:18 AM</div>
                                    </div>
                                    <div className={styles.lastMessage}>
                                        Last message...
                                    </div>
                                </div>
                            </li>
                            <li>
                                <img alt="Avatar"
                                     className={styles.smallAvatar}
                                     src={require('../assets/avatar.png')}
                                     width="50px" height="50px"/>
                                <div>
                                    <div className={styles.nameAndDate}>
                                        <div className={styles.name}>Steven Johnson</div>
                                        <div className={styles.lastMessageTime}>9:18 AM</div>
                                    </div>
                                    <div className={styles.lastMessage}>
                                        Last message...
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.rightBar}>
                    <div className={styles.recipientInfo}>
                        <img alt="Avatar"
                             className={styles.smallAvatar}
                             src={require('../assets/avatar.png')}
                             width="40px"
                             height="40px"/>
                        <div>
                            <div className={styles.name}>Steven Johnson</div>
                            <div className={styles.lastSeen}>last seen: 11 minutes ago</div>
                        </div>
                    </div>

                    <div className={styles.messages} id="messages">
                        <div style={{flexGrow: 1}}/>
                        <div className={styles.outcoming}>
                            <div className={styles.message}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Cras ac vestibulum est. Cras vestibulum sagittis molestie.
                            </div>
                            <div className="message-info">
                                12:34 AM, read
                            </div>
                        </div>
                        <div className={styles.incoming}>
                            <div className="message">
                                Maecenas luctus, arcu quis mollis blandit, lorem lectus cursus enim,
                                vel suscipit elit ipsum ullamcorper purus.
                            </div>
                            <div className="message-info">
                                12:34 AM, read
                            </div>
                        </div>
                        <div className={styles.incoming}>
                            <div className="message">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Cras ac vestibulum est. Cras vestibulum sagittis molestie.
                                Fusce feugiat porttitor turpis. Fusce tincidunt sollicitudin magna.
                                Maecenas luctus, arcu quis mollis blandit, lorem lectus cursus enim,
                                vel suscipit elit ipsum ullamcorper purus.
                            </div>
                            <div className="message-info">
                                12:34 AM, read
                            </div>
                        </div>
                        <div className={styles.incoming}>
                            <div className="message">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Cras ac vestibulum est. Cras vestibulum sagittis molestie.
                                Vivamus semper mi sit amet odio ornare, a fermentum ex placerat.
                                Curabitur at est quam. Cras ut molestie leo. Sed a convallis libero.
                                Aenean faucibus nisi nec dolor consequat dignissim. Duis ut volutpat arcu.
                                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                                Fusce feugiat porttitor turpis. Fusce tincidunt sollicitudin magna.
                                Maecenas luctus, arcu quis mollis blandit, lorem lectus cursus enim,
                                vel suscipit elit ipsum ullamcorper purus.
                            </div>
                            <div className="message-info">
                                12:34 AM, read
                            </div>
                        </div>
                        <div className={styles.outcoming}>
                            <div className="message">
                                Lorem ipsum dolor sit amet
                            </div>
                            <div className="message-info">
                                12:34 AM, read
                            </div>
                        </div>
                    </div>

                    <div className={styles.inputBar}>
                        <button className="attach">
                            <i className="fas fa-paperclip"/>
                            <FontAwesomeIcon icon={faPaperclip}/>
                        </button>
                        <label style={{display: "none"}}>
                            <textarea name="text" placeholder="Write a message..."/>
                        </label>
                        <div className={styles.textArea}
                             contentEditable="true"
                            // onKeyDown="onKeyDown(event, this)"
                            // onfocusout="onFocusOut(event, this)"
                             data-placeholder="Write a message..."/>
                        <button>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}