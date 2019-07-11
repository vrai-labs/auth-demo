import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as http from 'http';
import * as React from 'react';
import * as SuperTokens from 'supertokens-node-mysql-ref-jwt/express';

import login from './login';
import logout from './logout';
import refreshtoken from './refreshtoken';
import userInfo from './userInfo';

let app = express();
app.use(cookieParser());
SuperTokens.init({
    cookie: {
        domain: "demo.supertokens.io",
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
}).then(() => {
    initRoutesAndServer();
}).catch((err: any) => {
    console.log("error while initing auth service!", err);
});

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

    app.get("/bundle.js", function (req, res, next) {
        res.sendFile("bundle.js", { root: "./" });
    });

    app.get("/", async function (req, res) {
        try {
            let result = await SuperTokens.getSession(req, res, false);
            res.redirect("/home");
            return;
        } catch (err) {
            if (SuperTokens.Error.isErrorFromAuth(err) &&
                err.errType === SuperTokens.Error.TRY_REFRESH_TOKEN) {
                res.redirect("/home");
                return;
            }
        };
        res.sendFile("index.html", { root: "./" });
    });

    app.get("/attack", async function (req, res) {
        try {
            let result = await SuperTokens.getSession(req, res, false);
            res.redirect("/attackhome");
            return;
        } catch (err) {
            if (SuperTokens.Error.isErrorFromAuth(err) &&
                err.errType === SuperTokens.Error.TRY_REFRESH_TOKEN) {
                res.redirect("/attackhome");
                return;
            }
        };
        res.sendFile("index.html", { root: "./" });
    });

    app.use("*", function (req, res, next) {
        res.sendFile("index.html", { root: "./" });
    });

    let server = http.createServer(app);
    server.listen(8080, "0.0.0.0");
}
