import * as express from 'express';

export async function recentTheft(req: express.Request, res: express.Response) {
    res.send(JSON.stringify(Thefts.list));
}

export class Thefts {
    static list: { userId: string, time: number }[] = [];
    static add = (userId: string) => {
        if (Thefts.list.length >= 20) {
            Thefts.list.pop();
        }
        Thefts.list.unshift({ userId, time: Date.now() });
    }
}