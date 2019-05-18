import * as Auth from 'auth-node-mysql';
import * as express from 'express';

export default async function refreshtoken(req: express.Request, res: express.Response) {
    try {
        await Auth.refreshSession(req, res);
        res.send("");
    } catch (err) {
        if (Auth.Error.isErrorFromAuth(err) && err.errType !== Auth.Error.GENERAL_ERROR) {
            res.status(440).send("Session expired");
        } else {
            throw err;
        }
    }
} 