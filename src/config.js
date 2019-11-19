export default {
    s3: {
        REGION: "",
        BUCKET: ""
    },
    cognito: {
        REGION: "",
        USER_POOL_ID: process.env.REACT_APP_COGNITO_USER_POOL_ID,
        APP_CLIENT_ID: process.env.REACT_APP_COGNITO_CLIENT_ID,
        IDENTITY_POOL_ID: ""
    },
    social: {
        GOOGLE: "",
        FB: ""
    }
};