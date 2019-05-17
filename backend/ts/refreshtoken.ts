import * as Auth from 'auth-node-mysql';
import * as express from 'express';

export default async function refreshtoken(req: express.Request, res: express.Response) {
    await Auth.refreshSession(req, res);
    res.send("");
} 