import {Auth} from 'aws-amplify';

const debug = true;

// Sign in user using email/password
async function signIn({email, password, rememberMe}) {
    return Auth.signIn(email, password)
        .then((user) => {
            console.log(user);
            localStorage.setItem('signedIn', "true");
            if (rememberMe) {
                // todo remember device
            }
            return user;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}

// Get AWS credentials directly from Cognito
async function socialSignIn(provider) {
    return Auth.federatedSignIn({provider})
        .then(res => {
            console.log(res);
            return Auth.currentAuthenticatedUser();
        })
        .then(res => {
            console.log(res);
            localStorage.setItem('social_user', JSON.stringify(res));
            localStorage.setItem('signedIn', "true");
            return res;
        })
        .catch(e => {
            console.log(e);
            return e;
        });
}

function linkSocial() {
    const params = {
        "DestinationUser": {
            "ProviderAttributeValue": "username",
            "ProviderName": "Cognito"
        },
        "SourceUser": {
            "ProviderAttributeName": "Cognito_Subject",
            "ProviderAttributeValue": "username",
            "ProviderName": "Google"
        },
        "UserPoolId": "YOUR_POOL"
    };

}

// Sign out users.
async function signOut(global = false) {
    if (debug) console.log(`Logging out...`);
    /**
     * Note: although the tokens are revoked,
     * the AWS credentials will remain valid until they expire (which by default is 1 hour)
     */
    return Auth.signOut({global})
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

// Update password
async function changePassword(oldPassword, newPassword) {
    return Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, oldPassword, newPassword);
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

// Send email to reset password
async function forgotPassword(email) {
    return Auth.forgotPassword(email)
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}

// Update forgot password using code from email
async function forgotPasswordSubmit(email, code, new_password) {
    return Auth.forgotPasswordSubmit(email, code, new_password)
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}

// Creates a new user in User Pool
async function signUp(user) {
    return Auth.signUp({
        username: user.email,
        password: user.password,
        attributes: {
            // 'email': user.email,
            // 'given_name': user.firstName,
            // 'last_name': user.lastName
        },
        validationData: []  //optional
    })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            console.log(err);
            throw err; // re-throw
        });
}

// After retrieving the confirmation code from the user
async function confirmSignup(params) {
    console.log(JSON.stringify(params, null, 2));
    return Auth.confirmSignUp(params.email, params.code, {
        // Optional. Force user confirmation irrespective of existing alias. By default set to True.
        forceAliasCreation: true
    })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(err => {
            console.log(err);
            throw err; // re-throw
        });

}

// Resend Sign Up code
async function resetConfirmationCode(email) {
    return Auth.resendSignUp(email)
        .then((res) => {
            console.log('Auth: Code resent successfully.');
            return res;
        })
        .catch(e => {
            console.log(e);
            throw e;
        });
}

// Get user attributes
async function getCurrentUser() {
    // let user = await Auth.currentAuthenticatedUser({bypassCache: true});
    // const {attributes} = user;
    // console.log(attributes);
    // return user;
}

// Update user attributes
async function updateProfile(newUser) {
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.updateUserAttributes(user, newUser);
    console.log(result); // SUCCESS
    return result;
}

// Check if current user is authenticated
function isAuthenticated() {
    return localStorage.getItem('signedIn') === "true";
}

export default {
    signIn,
    socialSignIn,
    signOut,
    signUp,
    confirmSignup,
    resetConfirmationCode,
    changePassword,
    forgotPassword,
    forgotPasswordSubmit,
    getCurrentUser,
    isAuthenticated,
    updateProfile
};