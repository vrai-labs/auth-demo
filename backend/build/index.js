"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const SuperTokens = require("supertokens-node-mysql-ref-jwt/express");
const login_1 = require("./login");
const logout_1 = require("./logout");
const refreshtoken_1 = require("./refreshtoken");
const userInfo_1 = require("./userInfo");
let mysqlExecutionMasterPassword;
try {
    let mysqlSecret = require("/home/ubuntu/secret/db/mysql/secret.json");
    mysqlExecutionMasterPassword = mysqlSecret.execution_master;
}
catch (err) { }
let app = express();
app.use(cookieParser());
SuperTokens.init({
    cookie: {
        domain: process.env.DOMAIN === undefined ? "demo.supertokens.io" : process.env.DOMAIN,
        secure: mysqlExecutionMasterPassword !== undefined // if not undefined, then we are running in production.. which has https
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
}).catch((err) => {
    console.log("error while initing auth service!", err);
});
function initRoutesAndServer() {
    app.post("/api/login", function (req, res) {
        login_1.default(req, res).catch(err => {
            console.log(err);
            res.status(500).send("");
        });
    });
    app.get("/api/userInfo", function (req, res) {
        userInfo_1.default(req, res).catch(err => {
            console.log(err);
            res.status(500).send("");
        });
    });
    app.post("/api/refreshtoken", function (req, res) {
        refreshtoken_1.default(req, res).catch(err => {
            console.log(err);
            res.status(500).send("");
        });
    });
    app.post("/api/logout", function (req, res) {
        logout_1.default(req, res).catch(err => {
            console.log(err);
            res.status(500).send("");
        });
    });
    app.get("/bundle.js", function (req, res, next) {
        res.sendFile("bundle.js", { root: "./" });
    });
    app.get("/", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield SuperTokens.getSession(req, res, false);
                res.redirect("/home");
                return;
            }
            catch (err) {
                if (SuperTokens.Error.isErrorFromAuth(err) &&
                    err.errType === SuperTokens.Error.TRY_REFRESH_TOKEN) {
                    res.redirect("/home");
                    return;
                }
            }
            ;
            res.sendFile("index.html", { root: "./" });
        });
    });
    app.get("/attack", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield SuperTokens.getSession(req, res, false);
                res.redirect("/attackhome");
                return;
            }
            catch (err) {
                if (SuperTokens.Error.isErrorFromAuth(err) &&
                    err.errType === SuperTokens.Error.TRY_REFRESH_TOKEN) {
                    res.redirect("/attackhome");
                    return;
                }
            }
            ;
            res.sendFile("index.html", { root: "./" });
        });
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
    });
    io.on('connection', (client) => {
        client.on('event', (data) => {
            console.log(data);
            console.log(data);
        });
        client.on('disconnect', () => { });
    });
}
//# sourceMappingURL=index.js.map