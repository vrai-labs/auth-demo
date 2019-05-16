import * as express from 'express';

export default async function userInfo(req: express.Request, res: express.Response) {
    res.send(JSON.stringify({
        name: "Hello world"
    }));
} 