"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth = require("auth-node-mysql");
const cookieParser = require("cookie-parser");
const express = require("express");
const http = require("http");
const login_1 = require("./login");
const logout_1 = require("./logout");
const refreshtoken_1 = require("./refreshtoken");
const userInfo_1 = require("./userInfo");
let app = express();
app.use(cookieParser()); // TODO: this is necessary! put this in Auth.init?
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
}).catch((err) => {
    console.log("error while initing auth service!", err);
});
function initRoutesAndServer() {
    app.post("/api/login", function (req, res) {
        login_1.default(req, res).catch(err => {
            res.status(500).send(err.message);
        });
    });
    app.get("/api/userInfo", function (req, res) {
        userInfo_1.default(req, res).catch(err => {
            res.status(500).send(err.message);
        });
    });
    app.post("/api/refreshtoken", function (req, res) {
        refreshtoken_1.default(req, res).catch(err => {
            res.status(500).send(err.message);
        });
    });
    app.post("/api/logout", function (req, res) {
        logout_1.default(req, res).catch(err => {
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
//# sourceMappingURL=index.js.map