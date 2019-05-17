import * as Auth from 'auth-node-mysql';
import * as express from 'express';

import Names from './names';

export default async function login(req: express.Request, res: express.Response) {
    let session = await Auth.createNewSession(res, getRandomString(), {
        name: getRandomName()
    });
    res.send("");
}

function getRandomString(): string {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    let res = "";
    for (let i = 0; i < 10; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
}

function getRandomName(): string {
    let randomName = Names[Math.floor(Math.random() * Names.length)];
    return randomName.firstName + " " + randomName.lastName;
}