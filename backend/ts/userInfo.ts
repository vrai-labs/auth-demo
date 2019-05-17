import * as Auth from 'auth-node-mysql';
import * as express from 'express';

export default async function userInfo(req: express.Request, res: express.Response) {
    try {
        let session = await Auth.getSession(req, res);
        let userId = session.getUserId();
        let metaInfo = await session.getMetaInfo();
        let name = metaInfo.name;
        res.send(JSON.stringify({
            name, userId
        }));
    } catch (err) {
        if (err.errCode !== undefined && err.errCode !== 40002 && err.errCode !== 40001 && err.errCode !== 31001) {
            res.status(440).send("Session expired");
        } else {
            throw err;
        }
    }
} 