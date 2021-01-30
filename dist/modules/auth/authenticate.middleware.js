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
exports.authenticate = void 0;
const admin = __importStar(require("firebase-admin"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!authorization.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const arrTokenSplit = authorization.split(' ');
    if (arrTokenSplit.length !== 2) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = arrTokenSplit[1];
    try {
        const decodedIdToken = yield admin.auth().verifyIdToken(token, true);
        // console.log(decodedIdToken.uid);
        res.locals = Object.assign(Object.assign({}, res.locals), { uid: decodedIdToken.uid, email: decodedIdToken.email, admin: decodedIdToken.admin });
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.middleware.js.map