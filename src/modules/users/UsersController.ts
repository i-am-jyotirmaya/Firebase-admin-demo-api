import { Request, Response } from "express";
import * as admin from "firebase-admin";
import { User } from "../../models/UserModel";

//GET //RA
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await admin.auth().listUsers();

        const usersList: User[] = users.users.map((userRecord: admin.auth.UserRecord) => {
            return mapUserFromUserRecord(userRecord);
        });

        return res.status(200).json(usersList);
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

//GET 
export const getUser = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        const userRecord = await admin.auth().getUser(uid);
        const user = mapUserFromUserRecord(userRecord);

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json(error);
    }
}

//PUT
export const updateUser = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        const {displayName} = req.body;
        const updatedUserRecord = await admin.auth().updateUser(uid, {
            displayName: displayName
        });
        return res.status(200).json({message: 'User updated!'});
    } catch (error) {
        
    }
}

//POST //RA
export const createUser = async (req: Request, res: Response) => {
    try {
        const {email, password, displayName} = req.body;
        const createdUserRecord = await admin.auth().createUser({
            displayName: displayName,
            email: email,
            password: password
        });
        const createdUser = mapUserFromUserRecord(createdUserRecord);

        return res.status(201).json(createdUser);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//POST //RA
export const createAdminUser = async (req: Request, res: Response) => {
    try {
        const customClaims = {
            admin: true
        };
        const {email, password, displayName} = req.body;
        const createdUserRecord = await admin.auth().createUser({
            displayName: displayName,
            email: email,
            password: password
        });
        await admin.auth().setCustomUserClaims(createdUserRecord.uid, customClaims);
        const updatedUserRecord = await admin.auth().getUser(createdUserRecord.uid);
        const createdUser = mapUserFromUserRecord(updatedUserRecord);

        return res.status(201).json(createdUser);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//DELETE //RA
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        await admin.auth().deleteUser(uid);
        
        return res.status(200).send();
    } catch (error) {
        return res.status(500).json(error);
    }
}

//DELETE //RA
export const deleteUsers = async (req: Request, res: Response) => {
    try {
        const uidList = req.body.uidList as string[];
        const deleteUserResult = await admin.auth().deleteUsers(uidList);
        
        const result = {
            errors: deleteUserResult.errors,
            successCount: deleteUserResult.successCount,
            failureCount: deleteUserResult.failureCount
        }

        return res.status(202).json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//GET //RA
export const forceSignOut = async (req: Request, res: Response) => {
    try {
        const {uid} = req.params;
        await admin.auth().revokeRefreshTokens(uid);

        return res.status(200).send();
    } catch (error) {
        return res.status(500).json(error);
    }
}

//GET
// export const forceSignoutAllUsers = async (req: Request, res: Response) => {
//     try {
//         const listUsersResult = await admin.auth().listUsers();
//         listUsersResult.users.forEach(async user => {
//             await admin.auth().revokeRefreshTokens(user.uid);
//         });

//         return res.status(200);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// }

//Util Functions
const mapUserFromUserRecord = (userRecord: admin.auth.UserRecord): User => {
    const customClaims = (userRecord.customClaims || {admin: false}) as {admin?: boolean}
    const admin = customClaims.admin ? customClaims.admin : false;
    return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        lastSignInTime: userRecord.metadata.lastSignInTime,
        creationTime: userRecord.metadata.creationTime,
        emailVerified: userRecord.emailVerified,
        admin
    }
}