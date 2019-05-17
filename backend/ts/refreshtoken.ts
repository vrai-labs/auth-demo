import * as Auth from 'auth-node-mysql';
import * as express from 'express';

export default async function refreshtoken(req: express.Request, res: express.Response) {
    try {
        await Auth.refreshSession(req, res);
        res.send("");
    } catch (err) {
        if (err.errCode !== undefined && err.errCode !== 40002 && err.errCode !== 40001 && err.errCode !== 31001) {
            res.status(440).send("Session expired");
        } else {
            throw err;
        }
    }
} 