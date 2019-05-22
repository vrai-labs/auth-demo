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
const SuperTokens = require("supertokens-node-mysql-ref-jwt");
const login_1 = require("./login");
const logout_1 = require("./logout");
const recenttheft_1 = require("./recenttheft");
const refreshtoken_1 = require("./refreshtoken");
const userInfo_1 = require("./userInfo");
let app = express();
app.use(cookieParser()); // TODO: this is necessary! put this in Auth.init?
SuperTokens.init({
    cookie: {
        domain: "supertokens.io",
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
}).catch((err) => {
    console.log("error while initing auth service!", err);
});
function onTokenTheftDetection(userId, sessionHandle) {
    return __awaiter(this, void 0, void 0, function* () {
        yield SuperTokens.revokeSessionUsingSessionHandle(sessionHandle);
        recenttheft_1.Thefts.add(userId);
    });
}
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
    app.get("/api/recenttheft", function (req, res) {
        recenttheft_1.recentTheft(req, res).catch(err => {
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
                let result = yield SuperTokens.getSession(req, res);
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
    app.use("*", function (req, res, next) {
        res.sendFile("index.html", { root: "./" });
    });
    let server = http.createServer(app);
    server.listen(8080, "0.0.0.0");
}
//# sourceMappingURL=index.js.map