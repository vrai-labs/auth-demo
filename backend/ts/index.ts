import * as Auth from 'auth-node-mysql';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as http from 'http';
import * as React from 'react';

import login from './login';
import logout from './logout';
import { recentTheft, Thefts } from './recenttheft';
import refreshtoken from './refreshtoken';
import userInfo from './userInfo';

let app = express();
app.use(cookieParser());    // TODO: this is necessary! put this in Auth.init?
Auth.init({
    cookie: {
        domain: "192.168.1.112",
        secure: false
    },
    mysql: {
        password: "root",
        user: "root",
        database: "auth_session"
    },
    tokens: {
        refreshToken: {
            renewTokenPath: "/api/refreshtoken"
        },
        accessToken: {
            validity: 10
        }
    },
    onTokenTheftDetection
}).then(() => {
    initRoutesAndServer();
}).catch((err: any) => {
    console.log("error while initing auth service!", err);
});

async function onTokenTheftDetection(userId: string, sessionHandle: string) {
    await Auth.revokeSessionUsingSessionHandle(sessionHandle);
    Thefts.add(userId);
}

function initRoutesAndServer() {
    app.post("/api/login", function (req, res) {
        login(req, res).catch(err => {
            console.log(err);
            res.status(500).send("");
        });
    });

    app.get("/api/userInfo", function (req, res) {
        userInfo(req, res).catch(err => {
            console.log(err);
            res.status(500).send("");
        });
    });

    app.post("/api/refreshtoken", function (req, res) {
        refreshtoken(req, res).catch(err => {
            console.log(err);
            res.status(500).send("");
        });
    });

    app.post("/api/logout", function (req, res) {
        logout(req, res).catch(err => {
            console.log(err);
            res.status(500).send("");
        });
    });

    app.get("/api/recenttheft", function (req, res) {
        recentTheft(req, res).catch(err => {
            console.log(err);
            res.status(500).send("");
        });
    });

    app.get("/bundle.js", function (req, res, next) {
        res.sendFile("bundle.js", { root: "./" });
    });

    app.get("/", async function (req, res) {
        try {
            let result = await Auth.getSession(req, res);
            res.redirect("/home");
            return;
        } catch (err) {
            if (Auth.Error.isErrorFromAuth(err) &&
                err.errType === Auth.Error.TRY_REFRESH_TOKEN) {
                res.redirect("/home");
                return;
            }
        };
        res.sendFile("index.html", { root: "./" });
    });

    app.use("*", function (req, res, next) {
        res.sendFile("index.html", { root: "./" });
    });

    let server = http.createServer(app);
    server.listen(9000, "0.0.0.0");
}