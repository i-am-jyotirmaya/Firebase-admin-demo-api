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
exports.revokeAdmin = exports.makeAdmin = void 0;
const admin = __importStar(require("firebase-admin"));
//GET
const makeAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.uid;
        console.log(uid);
        const userRecord = yield admin.auth().getUser(uid);
        if (!(userRecord.customClaims && userRecord.customClaims.admin)) {
            const adminClaim = {
                admin: true
            };
            yield admin.auth().setCustomUserClaims(uid, adminClaim);
            return res.status(202).send();
        }
        else {
            return res.status(200).json({ message: 'User is already an admin!' });
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.makeAdmin = makeAdmin;
//GET
const revokeAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.params.uid;
        const userRecord = yield admin.auth().getUser(uid);
        if (userRecord.customClaims && userRecord.customClaims.admin) {
            const adminClaim = {
                admin: false
            };
            yield admin.auth().setCustomUserClaims(uid, adminClaim);
            return res.status(202).send();
        }
        else {
            return res.status(200).json({ message: 'User is not an admin!' });
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
exports.revokeAdmin = revokeAdmin;
//# sourceMappingURL=AdminController.js.map