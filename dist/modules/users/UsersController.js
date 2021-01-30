"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceSignOut = exports.deleteUsers = exports.deleteUser = exports.createAdminUser = exports.createUser = exports.updateUser = exports.getUser = exports.getAllUsers = void 0;
const admin = __importStar(require("firebase-admin"));
//GET //RA
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield admin.auth().listUsers();
        const usersList = users.users.map((userRecord) => {
            return mapUserFromUserRecord(userRecord);
        });
        return res.status(200).json(usersList);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getAllUsers = getAllUsers;
//GET 
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.uid;
        const userRecord = yield admin.auth().getUser(uid);
        const user = mapUserFromUserRecord(userRecord);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.getUser = getUser;
//PUT
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.uid;
        const { displayName } = req.body;
        const updatedUserRecord = yield admin.auth().updateUser(uid, {
            displayName: displayName
        });
        return res.status(200).json({ message: 'User updated!' });
    }
    catch (error) {
    }
});
exports.updateUser = updateUser;
//POST //RA
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, displayName } = req.body;
        const createdUserRecord = yield admin.auth().createUser({
            displayName: displayName,
            email: email,
            password: password
        });
        const createdUser = mapUserFromUserRecord(createdUserRecord);
        return res.status(201).json(createdUser);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.createUser = createUser;
//POST //RA
const createAdminUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customClaims = {
            admin: true
        };
        const { email, password, displayName } = req.body;
        const createdUserRecord = yield admin.auth().createUser({
            displayName: displayName,
            email: email,
            password: password
        });
        yield admin.auth().setCustomUserClaims(createdUserRecord.uid, customClaims);
        const updatedUserRecord = yield admin.auth().getUser(createdUserRecord.uid);
        const createdUser = mapUserFromUserRecord(updatedUserRecord);
        return res.status(201).json(createdUser);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.createAdminUser = createAdminUser;
//DELETE //RA
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.uid;
        yield admin.auth().deleteUser(uid);
        return res.status(200).send();
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.deleteUser = deleteUser;
//DELETE //RA
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uidList = req.body.uidList;
        const deleteUserResult = yield admin.auth().deleteUsers(uidList);
        const result = {
            errors: deleteUserResult.errors,
            successCount: deleteUserResult.successCount,
            failureCount: deleteUserResult.failureCount
        };
        return res.status(202).json(result);
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.deleteUsers = deleteUsers;
//GET //RA
const forceSignOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        yield admin.auth().revokeRefreshTokens(uid);
        return res.status(200).send();
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.forceSignOut = forceSignOut;
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
const mapUserFromUserRecord = (userRecord) => {
    const customClaims = (userRecord.customClaims || { admin: false });
    const admin = customClaims.admin ? customClaims.admin : false;
    return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        lastSignInTime: userRecord.metadata.lastSignInTime,
        creationTime: userRecord.metadata.creationTime,
        emailVerified: userRecord.emailVerified,
        admin
    };
};
//# sourceMappingURL=UsersController.js.map