import axios from "axios";
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: 'us-east-1_69OWWddMZ',
    ClientId: '4mldl4aumvbk660dh0iuhfsq1k'
};
const userPool = new CognitoUserPool(poolData);


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
                // const accessToken = result.getAccessToken().getJwtToken();
                // mazon Cognito creates a session and returns an ID, access, and refresh token for the authenticated user.
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
        .then(response => createSession(response.data));
}

function logout() {
    localStorage.removeItem('currentUser');
}

function register(user) {
    //return axios.post('/api/v1/auth/register', user);
    return new Promise((resolve, reject) => {
        const attributeList = [];
        attributeList.push(new CognitoUserAttribute({
            Name: 'email',
            Value: user.email,
        }));
        attributeList.push(new CognitoUserAttribute({
            Name: 'given_name',
            Value: user.firstName,
        }));
        attributeList.push(new CognitoUserAttribute({
            Name: 'family_name',
            Value: user.lastName
        }));
        userPool.signUp(user.email, user.password, attributeList, null, (err, result) => {
            console.log(err);
            console.log(result);
            if (err) {
                console.error(err.message);
                reject(err.code);
                return;
            }
            // InvalidPasswordException
            let cognitoUser = result.user;
            console.log('User name is ' + cognitoUser.getUsername());
            resolve(result);
        });
    });
}

function isAuthenticated() {
    return 'currentUser' in localStorage;
}

function createSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

export default {
    login,
    socialLogin,
    logout,
    register,
    getCurrentUser,
    isAuthenticated
};