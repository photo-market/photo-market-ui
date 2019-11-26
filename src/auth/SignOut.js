import React, {useState, useEffect} from 'react';
import authService from "../common/Auth";

export default ({history}) => {

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        console.log('SignOut - useEffect');
        authService.signOut(true)
            .then((result) => {
                console.log('SignOut: Logged out!');
                setRedirect(true);
            })
            .catch((err) => {
                console.log('SignOut: Cant signout');
                console.log(err);
            })
            .finally(() => {
                console.log('SignOut: Im done! :)');
            });
    }, []);

    useEffect(() => {
        if (redirect) {
            console.log('SignOut: Redirecting...');
            history.push('/');
        }
    });

    return (
        <div>
            Logging you out...
        </div>
    );
}