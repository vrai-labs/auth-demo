import * as Auth from 'auth-node-mysql-ref-jwt';
import * as express from 'express';

export default async function logout(req: express.Request, res: express.Response) {
    try {
        let session = await Auth.getSession(req, res);
        await session.revokeSession();
        res.send("");
    } catch (err) {
        if (Auth.Error.isErrorFromAuth(err) && err.errType !== Auth.Error.GENERAL_ERROR) {
            res.status(440).send("Session expired");
        } else {
            throw err;
        }
    }
}
