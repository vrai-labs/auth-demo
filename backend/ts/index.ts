import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as http from 'http';
import * as SuperTokens from 'supertokens-node-mysql-ref-jwt/express';

import login from './login';
import logout from './logout';
import refreshtoken from './refreshtoken';
import userInfo from './userInfo';


let mysqlExecutionMasterPassword: string | undefined;
try {
    let mysqlSecret: { execution_master: string } = require("/home/ubuntu/secret/db/mysql/secret.json");
    mysqlExecutionMasterPassword = mysqlSecret.execution_master;
} catch (err) { }

let app = express();
app.use(cookieParser());
SuperTokens.init({
    cookie: {
        domain: process.env.DOMAIN === undefined ? "demo.supertokens.io" : process.env.DOMAIN as string,
        secure: mysqlExecutionMasterPassword !== undefined  // if not undefined, then we are running in production.. which has https
    },
    mysql: {
        password: mysqlExecutionMasterPassword === undefined ? "root" : mysqlExecutionMasterPassword,
        user: mysqlExecutionMasterPassword === undefined ? "root" : "executionMaster",
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
    server.listen(mysqlExecutionMasterPassword === undefined ? 8080 : 9001, "0.0.0.0");

    const io = require('socket.io')(server);
    io.use((socket, next) => {
        console.log(socket);
        next();
    })
    io.on('connection', (client: any) => {
        client.on('event', (data: any) => {
            console.log(data);
            console.log(data);
        });
        client.on('disconnect', () => { /* … */ });
    });
}
