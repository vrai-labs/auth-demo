"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const login_1 = require("./login");
const userInfo_1 = require("./userInfo");
let app = express();
app.post("/api/login", function (req, res) {
    login_1.default(req, res).catch(err => {
        res.status(500).send("");
    });
});
app.get("/api/userInfo", function (req, res) {
    userInfo_1.default(req, res).catch(err => {
        res.status(500).send("");
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
//# sourceMappingURL=index.js.map