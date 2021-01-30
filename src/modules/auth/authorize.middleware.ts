import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

export const authorize = (adminRequired: boolean) => {
    return (req: Request, res: Response, next: Function) => {
        const { admin } = res.locals;

        if(admin || !adminRequired) {
            return next();
        }

        if(adminRequired && !admin) {
            return res.status(403).json({message: 'You don\'t have administrator priviledges!'});
        }
    }
}