import * as express from 'express';
import * as SuperTokens from 'supertokens-node-mysql-ref-jwt';

export default async function refreshtoken(req: express.Request, res: express.Response) {
    try {
        await SuperTokens.refreshSession(req, res);
        res.send("");
    } catch (err) {
        if (SuperTokens.Error.isErrorFromAuth(err) && err.errType !== SuperTokens.Error.GENERAL_ERROR) {
            res.status(440).send("Session expired");
        } else {
            throw err;
        }
    }
} 