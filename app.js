import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';


import WebAppAuthProvider from 'msal-node-wrapper'
const authConfig = {
    auth: {
        clientId: "3d93cae4-1fc1-4e37-9fed-9cb756091abc",
        authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        //Need this to not throw error
        clientSecret: process.env.CLIENT_SECRET,
        // redirectUri: "/redirect"
        redirectUri: "https://www.harmanzhang.me/redirect"
        // redirectUri: "https://harmanzhang-a6-websharer.azurewebsites.net/redirect"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
};


import models from './models.js';
import usersRouter from './routes/api/v3/apivs3.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.enable('trust proxy')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    //Need this to not throw error
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave:false
}))


const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());

app.use((req, res, next) => {
    req.models = models
    next()
})

app.use('/api/v3', usersRouter);

app.get('/signin', (req, res, next) => {
    return req.authContext.login({
        postLoginRedirectUri: "/", // redirect here after login
    })(req, res, next);

});
app.get('/signout', (req, res, next) => {
    return req.authContext.logout({
        postLogoutRedirectUri: "/", // redirect here after logout
    })(req, res, next);

});
app.use(authProvider.interactionErrorHandler());

export default app;