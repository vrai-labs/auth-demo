import * as express from 'express';
import * as http from 'http';
import * as React from 'react';

import login from './login';
import refreshtoken from './refreshtoken';
import userInfo from './userInfo';

let app = express();

app.post("/api/login", function (req, res) {
    login(req, res).catch(err => {
        res.status(500).send("");
    });
});

app.get("/api/userInfo", function (req, res) {
    userInfo(req, res).catch(err => {
        res.status(500).send("");
    });
});

app.get("/api/refreshtoken", function (req, res) {
    refreshtoken(req, res).catch(err => {
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