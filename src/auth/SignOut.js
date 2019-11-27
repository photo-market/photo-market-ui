import React, {useState, useEffect} from 'react';
import {useAuth} from "../common/AuthProvider";

export default ({history}) => {

    const auth = useAuth();

    useEffect(() => {
        console.log('SignOut - useEffect');
        auth.signOut()
            .then((result) => {
                console.log('SignOut: signed out!');
                history.push('/');
            })
            .catch((err) => {
                console.log('SignOut: Cant sign-out');
                console.log(err);
            })
            .finally(() => {
                console.log('SignOut: Im done! :)');
            });
    });


    return (
        <div>
            Logging you out...
        </div>
    );
}