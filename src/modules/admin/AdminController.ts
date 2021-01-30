import { Request, Response } from "express";
import * as admin from 'firebase-admin';

//GET
export const makeAdmin = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        console.log(uid);
        const userRecord = await admin.auth().getUser(uid);
        if(!(userRecord.customClaims && userRecord.customClaims.admin)) {
            const adminClaim = {
                admin: true
            }
            await admin.auth().setCustomUserClaims(uid, adminClaim);
            return res.status(202).send();
        } else {
            return res.status(200).json({message: 'User is already an admin!'});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

//GET
export const revokeAdmin = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        const userRecord = await admin.auth().getUser(uid);
        if(userRecord.customClaims && userRecord.customClaims.admin) {
            const adminClaim = {
                admin: false
            }
            await admin.auth().setCustomUserClaims(uid, adminClaim);
            return res.status(202).send();
        } else {
            return res.status(200).json({message: 'User is not an admin!'});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}