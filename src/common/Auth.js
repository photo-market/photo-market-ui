import axios from "axios";
import {COGNITO_POOL_DATA, DEFAULT_USER, USER_PROFILE_KEY} from './consts/userAuth';
import {
    AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool
} from "amazon-cognito-identity-js";

/**
 * Cognito AWS Examples: Using the JavaScript SDK
 * https://docs.amazonaws.cn/en_us/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html
 */

const userPool = new CognitoUserPool(COGNITO_POOL_DATA);

function login(email, password) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
            Username: email,
            Pool: userPool
        });
        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        });
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                console.log("Ok");
                console.log(result);
                // Amazon Cognito creates a session and returns an ID, access, and refresh token for the authenticated user.
                //const accessToken = result.getAccessToken().getJwtToken();
                //saveProfile(accessToken);
                _getAttributes(cognitoUser);
                resolve(result);
            },
            onFailure: (err) => {
                console.log("Error happened: ");
                console.log(err);
                // Possible codes:
                // UserNotConfirmedException
                reject(err.code);
            },
            newPasswordRequired: (var1, var2) => {
                console.log('newPasswordRequired');
                console.log(var1);
                console.log(var2);
                reject("newPasswordRequired");
            },
            mfaRequired: (codeDeliveryDetails) => {
                console.log("MFA");
                // var verificationCode = window.prompt('Please input verification code', '');
                // cognitoUser.sendMFACode(verificationCode, this);
                reject("MFA");
            }
        });
    });
}

function socialLogin(tokenId) {
    // function signinCallback(authResult) {
    //     if (authResult['status']['signed_in']) {
    //
    //         // Add the Google access token to the Cognito credentials login map.
    //         AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //             IdentityPoolId: 'IDENTITY_POOL_ID',
    //             Logins: {
    //                 'accounts.google.com': authResult['id_token']
    //             }
    //         });
    //         // Obtain AWS credentials
    //         AWS.config.credentials.get(function () {
    //             // Access AWS resources here.
    //         });
    //     }
    // }

    const data = {
        provider: 'google',
        token: tokenId
    };
    return axios.post(`/api/v1/auth/social-login`, data)
        .then(response => saveProfile(response.data));
}

function logout() {
    console.log(`Logging out...`);
    debugger;
    localStorage.setItem(USER_PROFILE_KEY, DEFAULT_USER);
}

function register(user) {
    return new Promise((resolve, reject) => {
        const attributes = [
            {Name: 'email', Value: user.email},
            {Name: 'given_name', Value: user.firstName},
            {Name: 'family_name', Value: user.lastName},
        ];
        const cognitoAttributes = attributes.map(attr => new CognitoUserAttribute(attr));
        userPool.signUp(user.email, user.password, cognitoAttributes, null, (err, result) => {
            console.log(err);
            console.log(result);
            if (err) {
                console.error(err.message);
                reject(err.code);
                return;
            }
            // Possible err.codes are:
            if (result && result.user) {
                let cognitoUser = result.user;
                console.log('User name is ' + cognitoUser.getUsername());
                resolve(result);
            }
        });
    });
}

/** Confirm user account using code received in email */
function confirmSignup(params) {
    return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
            Username: params.email,
            Pool: userPool
        });
        cognitoUser.confirmRegistration(params.confirmCode, true, (err, result) => {
            console.log(err);
            console.log(result);
            if (err) {
                console.log(err, err.stack); // an error occurred
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function isAuthenticated() {
    return USER_PROFILE_KEY in localStorage;
}

function saveProfile(user) {
    const userStr = JSON.stringify(user);
    console.log('AuthService: Saving profile...' + userStr);
    debugger;
    localStorage.setItem(USER_PROFILE_KEY, userStr);
}

function getCurrentUser() {
    const auth = localStorage.getItem(USER_PROFILE_KEY);
    if (auth) {
        return JSON.parse(auth);
    }
    return DEFAULT_USER;
}

function resetConfirmationCode(email) {
    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool
    });
    cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
            alert(err);
            return;
        }
        console.log(result);
    });
}

function _getAttributes(cognitoUser) {
    cognitoUser.getUserAttributes((err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        const user = {};
        result.forEach(attr => {
            user[attr.getName()] = attr.getValue();
        });
        console.log(user);
        saveProfile(user);
    });
}

export default {
    login,
    socialLogin,
    logout,
    register,
    confirmSignup,
    resetConfirmationCode,
    getCurrentUser,
    isAuthenticated
};