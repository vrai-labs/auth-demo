import * as Auth from 'auth-node-mysql';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as http from 'http';
import * as React from 'react';

import login from './login';
import logout from './logout';
import refreshtoken from './refreshtoken';
import userInfo from './userInfo';

let app = express();
app.use(cookieParser());    // TODO: this is necessary! put this in Auth.init?
Auth.init({
    cookie: {
        domain: "192.168.29.69",
        secure: false
    },
    mysql: {
        password: "root",
        user: "root",
        database: "auth_session"
    },
    tokens: {
        refreshToken: {
            renewTokenURL: "/api/refreshtoken"
        },
        accessToken: {
            validity: 10
        }
    }
}).then(() => {
    initRoutesAndServer();
}).catch((err: any) => {
    console.log("error while initing auth service!", err);
});

function initRoutesAndServer() {
    app.post("/api/login", function (req, res) {
        login(req, res).catch(err => {
            res.status(500).send(err.message);
        });
    });

    app.get("/api/userInfo", function (req, res) {
        userInfo(req, res).catch(err => {
            res.status(500).send(err.message);
        });
    });

    app.post("/api/refreshtoken", function (req, res) {
        refreshtoken(req, res).catch(err => {
            res.status(500).send(err.message);
        });
    });

    app.post("/api/logout", function (req, res) {
        logout(req, res).catch(err => {
            res.status(500).send(err);
        });
    });

    app.get("/bundle.js", function (req, res, next) {
        res.sendFile("bundle.js", { root: "./" });
    });

    app.use("*", function (req, res, next) {
        res.sendFile("index.html", { root: "./" });
    });

    let server = http.createServer(app);
    server.listen(9000, "0.0.0.0");
}