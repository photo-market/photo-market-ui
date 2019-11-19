/** Default user auth object */
export const DEFAULT_USER = Object.freeze({
    given_name: '',
    family_name: '',
    picture: '',
    email: '',
    gender: '',
});

export const COGNITO_POOL_DATA = Object.freeze({
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID
});

export const USER_PROFILE_KEY = "user_profile";

