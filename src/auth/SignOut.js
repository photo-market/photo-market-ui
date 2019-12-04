import React, {useEffect} from 'react';
import {useAuth} from "../common/useAuth";

export default (props) => {
    const auth = useAuth();

    useEffect(() => {
        if (auth.isAuthenticated) {
            auth.signOut()
                .then((result) => {
                    console.log('SignOut: signed out!');
                })
                .catch((err) => {
                    console.log('SignOut: Cant sign-out');
                    console.log(err);
                })
                .finally(() => {
                    console.log('SignOut: done.');
                });
        } else {
            props.history.push('/');
        }
    });

    return (
        <div>
            Logging you out...
        </div>
    );
}