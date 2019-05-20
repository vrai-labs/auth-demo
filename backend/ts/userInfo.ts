import * as Auth from 'auth-node-mysql-ref-jwt';
import * as express from 'express';

export default async function userInfo(req: express.Request, res: express.Response) {
    try {
        let session = await Auth.getSession(req, res);
        let userId = session.getUserId();
        let metaInfo = await session.getSessionData();
        let name = metaInfo.name;
        res.send(JSON.stringify({
            name, userId
        }));
    } catch (err) {
        if (Auth.Error.isErrorFromAuth(err) && err.errType !== Auth.Error.GENERAL_ERROR) {
            res.status(440).send("Session expired");
        } else {
            throw err;
        }
    }
} 